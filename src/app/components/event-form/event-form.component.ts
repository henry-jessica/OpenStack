import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { MatDialog, MatDialogConfig, MatDialogRef,MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { MessagesComponent } from '../messages/messages.component';
import { IMessages } from 'app/Interfaces/message-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  @Input() formTitle?: string;
  @Input() BtnName?: string;
  @Output() sucessFormMessage = new EventEmitter<boolean>();
  
  public dialogRef2?: MatDialogRef<MessagesComponent>;

  imageFile: any = null;
  event?: IEvent;
  eventForm: FormGroup = new FormGroup({});
  message?: IMessages;

  constructor( private _router: Router, private dialog: MatDialog, private _httpEventService: EventService, public dialogRef: MatDialogRef<EventDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.event = data;
  }

  ngOnInit(): void {
    console.log(this?.event, 'ngOnInit', this?.event?.name);
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
      eventDateEnds: new FormControl(this.event?.eventDateEnds),
      startsPrice: new FormControl(this.event?.startsPrice),
      urlImg: new FormControl(this.event?.urlImg),
      address: new FormGroup({
        city: new FormControl(this.event?.address?.city),
        county: new FormControl(this.event?.address?.county),
        line1: new FormControl(this.event?.address?.line1),
        eircode: new FormControl(this.event?.address?.eircode),
      }),
    });
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
          // console.log(`${p}: ${formObj[p]}`);
          if (p === "address") {
            formData.delete(p);
            formData.append(p, JSON.stringify(formObj[p]));
          } else {
            formData.delete(p);
            formData.append(p, formObj[p]);
          }
          // console.log(p);
        }
      }

      this._httpEventService.addEvent(formData).subscribe(
        sucess => this.sucessMessage('submit'),
        error => console.log(error),
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
        // console.log(p); 
      }
    }

    // console.log("This is the file ",this.imageFile);
    

    this._httpEventService.updateEvent(id, formData)
      .subscribe({
        next: book => {
          console.log(JSON.stringify(book) + ' has been updated');
          console.log(" book has been updated");
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
