import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { MessagesComponent } from '../messages/messages.component';
import { IMessages } from 'app/Interfaces/message-interface';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  // @Input() event?:any;
  @Input() formTitle?:string; 
  @Input() BtnName?:string; 
   
  // @Output() cancel: EventEmitter<null> = new EventEmitter<null>();
  // @Output() confirm: EventEmitter<null>=new EventEmitter<null>(); 
  
  eventForm : FormGroup = new FormGroup({}); 
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  message?: IMessages;

  private dialogRef2?: MatDialogRef<MessagesComponent>
  constructor(private dialog:MatDialog,private _httpEventService:EventService, public dialogRef: MatDialogRef<EventDetailsComponent>, @Inject(MAT_DIALOG_DATA) public event: any) {
    console.log(this.event?.event);
  }

  ngOnInit(): void {
    console.log(this?.event,'ngOnInit',this?.event?.name); 
    this.eventForm = new FormGroup({
      name: new FormControl (this.event?.event?.name, [Validators.required, Validators.minLength(4)]),
      description: new FormControl (this.event?.event?.description, [Validators.required]),
      contactNumber: new FormControl(this.event?.event?.contactNumber),
      contact_email: new FormControl(this.event?.event?.contact_email),
      eventDateStarts: new FormControl(this.event?.event?.eventDateStarts),
      eventDateEnds: new FormControl(this.event?.event?.eventDateEnds),
      startsPrice:  new FormControl(this.event?.event?.startsPrice),
      urlImg:new FormControl(this.event?.event?.urlImg),
      address: new FormGroup({
      city: new FormControl(this.event?.event?.address?.city),
      county: new FormControl(this.event?.event?.address?.county), 
      line1: new FormControl(this.event?.event?.address?.line1),
      eircode: new FormControl(this.event?.event?.address?.eircode), 
        })
      })
  }
  onSubmit(){
    if(this.event){
      console.log('forms edit event submitted');
      this?.updateEvent(this.event?.event?._id, this.eventForm?.value); 
    }
    else{
      console.log('forms edit event submitted');
      console.table(this.eventForm.value);
      this._httpEventService.addEvent(this.eventForm?.value).subscribe(
        sucess=> this.sucessMessage(), 
        error=> console.log(error), 
        () => console.log("complete")
      ); 
    }
}

  onCancel(){
    this.message={
      taskName:'Form',
      title:'Cancel Event?', 
      subtitle:'If you leave now, this event wont be saved', 
      btntext1:'Yes, cancel', 
      btntext2:'Dont cancel',
  }
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = false; 
    dialogConfig.width = "40%";
    dialogConfig.height = "31%";
    // this.dialog.open(MessagesComponent, dialogConfig); 
    this.dialogRef2= this.dialog.open(MessagesComponent, {data: { message: this.message}});
  }

  updateEvent(id: string, event: IEvent): void {
    console.log('updating ',id);
    console.table (event);
    this._httpEventService.updateEvent(id, event)
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
  sucessMessage(){
console.log("you did it")
  }
  // Cancel() {
  //   this.cancel.emit();
  // }
  // Confirm(){
  //   this.confirm.emit(); 
  // }


}
