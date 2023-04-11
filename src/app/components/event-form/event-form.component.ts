import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { MatDialog, MatDialogConfig, MatDialogRef,MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { MessagesComponent } from '../messages/messages.component';
import { IMessages } from 'app/Interfaces/message-interface';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
  });

  @Input() formTitle?: string;
  @Input() BtnName?: string;
  @Output() sucessFormMessage = new EventEmitter<boolean>();

  @ViewChild('positivekeywordsInput')
  positivekeywordsInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stepper')
  stepper?: MatStepper;
  
  filteredpositivekeywordss: Observable<string[]>;
  positivekeywordss: string[] = ['#nightout'];
  allpositivekeywordss: string[] = ['#lifeisnow', '#sport', '#goRovers', '#SligoNight'];
  
  public dialogRef2?: MatDialogRef<MessagesComponent>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  positivekeywordsCtrl = new FormControl('');

    //url; //Angular 8
	url: any; //Angular 11, for stricter type
	msg = "";
  icon = ""
  isShow:boolean = true; 
  isOptional = false;

  imageFile: any = null;
  event?: IEvent;
  eventForm: FormGroup = new FormGroup({});
  message?: IMessages;
  id: any;

  constructor( private _formBuilder: FormBuilder, private _router: Router, private dialog: MatDialog, private _httpEventService: EventService, public dialogRef: MatDialogRef<EventDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.event = data;
    this.filteredpositivekeywordss = this.positivekeywordsCtrl.valueChanges.pipe(
      startWith(null),
      map((positivekeywords: string | null) => (positivekeywords ? this._filter(positivekeywords) : this.allpositivekeywordss.slice())),
    );
    // passed from user profile to be pushed with service object
   // this.id = data.myObjectHolder;
   

  }

  ngOnInit(): void {
    // console.log(this?.event, 'ngOnInit', this?.event?.name);
    this.eventForm = new FormGroup({
      name: new FormControl(this.event?.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      description: new FormControl(this.event?.description, [
        Validators.required,
      ]),
      contactNumber: new FormControl(this.event?.contactNumber),
      contact_email: new FormControl(this.event?.contact_email),
      eventDateStarts: new FormControl(this.event?.eventDateStarts),
      // eventDateEnds: new FormControl('20/02/2023'),
      startsPrice: new FormControl(this.event?.startsPrice),
      category: new FormControl(this.event?.category),
      address: new FormGroup({
        city: new FormControl(this.event?.address?.city),
        county: new FormControl(this.event?.address?.county),
        line1: new FormControl(this.event?.address?.line1),
        eircode: new FormControl(this.event?.address?.eircode),
      }),
      views:new FormControl(0),

    });
  }

  onSelectionChange() {
    console.log('Selection change event triggered');
  }

  
  // onSubmit() {
  //   if (this.event) {
  //     this?.updateEvent(this.event?._id, this.eventForm?.value);
  //   } else {
  //     console.table(this.eventForm.value);
  //     this._httpEventService.addEvent(this.eventForm?.value).subscribe(
  //       (sucess) => this.sucessMessage('submit'), 
  //       (error) => console.log(error),
  //       () => console.log('complete')
  //     );
  //   }
  // }

  onBack(stepper: MatStepper){
    stepper.previous();
}
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allpositivekeywordss.filter(positivekeywords => positivekeywords.toLowerCase().includes(filterValue));
  }

	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
      this.isShow = false; 

			this.url = reader.result; 
		}
	}

  remove(positivekeywords: string): void {
    const index = this.positivekeywordss.indexOf(positivekeywords);

    if (index >= 0) {
      this.positivekeywordss.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.positivekeywordss.push(event.option.viewValue);
    this.positivekeywordsInput.nativeElement.value = '';
    this.positivekeywordsCtrl.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our positivekeywords
    if (value) {
      this.positivekeywordss.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.positivekeywordsCtrl.setValue(null);
  }
  
  onSubmit() {

    if (this.event) {
      console.log('forms edit event submitted');
      this?.updateEvent(this.event?._id, this.eventForm?.value);
    } else {
      console.log('forms edit event submitted');
      console.log(this.eventForm);
      const formData = new FormData();
      formData.delete("image");
      formData.append("image", this.imageFile);

      const formObj = { ...this.eventForm.value };
      for (const p in formObj) {
        if (p && p !== null && formObj[p] && formObj[p] !== null) {
          if (p === "address") {
            formData.delete(p);
            formData.append(p, JSON.stringify(formObj[p]));
          } else {
            formData.delete(p);
            formData.append(p, formObj[p]);
          }
        }
      }

      this._httpEventService.addEvent(formData).subscribe(
        sucess => this.sucessMessage('submit'),
        // error => console.log(error),
        () => console.log("complete")
      );

    }
  }

  onCancel() {
    this.message = {
      taskName: 'Form',
      title:    'Are you sure you want to exit this form?',
      subtitle: 'If you leave now, this event wont be saved',
      btntext1: 'Yes, cancel',
      btntext2: 'Dont cancel',
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '40%';
    dialogConfig.height = '31%';
    this.dialogRef2 = this.dialog.open(MessagesComponent, {
      data: { message: this.message },
    });
  }

  updateEvent(id: string, event: IEvent): void {
    console.log('updating ', id);
    
    const formData = new FormData();
    if (this.imageFile) {
      formData.delete("image");
      formData.append("image", this.imageFile);
    }
    
    const formObj:any = { ...event };
    if(!event.address.city) delete formObj.address;

    for (const p in formObj) {
      if (p && p !== null && formObj[p] && formObj[p] !== null) {
        // console.log(`${p}: ${formObj[p]}`);
        if (p === "address") {
          formData.delete(p);
          formData.append(p, JSON.stringify(formObj[p]));
        } else {
          formData.delete(p);
          formData.append(p, formObj[p]);
        }
      }
    }


    this._httpEventService.updateEvent(id, formData)
      .subscribe({
        next: book => {
          console.log(JSON.stringify(book) + ' has been updated');
          this.sucessMessage('update')
        },
        
        error: (err) => console.log(err)
      });
  }


  get name() {
    return this.eventForm.get('name');
  }
  sucessMessage(stage:string) {
    //reload screen 
    this.dialog.closeAll();
    this._router.routeReuseStrategy. shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';


    if(stage=='submit'){
    this._router.navigate(['home']);
    }
    else if(stage=='update'){
      this._router.navigate(['/events', this.event?._id]);
    }
  }

  onFileUpload(upE: any): void {
    this.imageFile = upE.target.files[0];
  }
}
