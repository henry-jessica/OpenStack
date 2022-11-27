import { Component, Inject, Input, OnInit } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { MatDialog, MatDialogConfig, MatDialogRef,MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { MessagesComponent } from '../messages/messages.component';
import { IMessages } from 'app/Interfaces/message-interface';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  @Input() formTitle?: string;
  @Input() BtnName?: string;
  event?: IEvent;
  eventForm: FormGroup = new FormGroup({});

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  message?: IMessages;

  public dialogRef2?: MatDialogRef<MessagesComponent>;
  constructor(
    private dialog: MatDialog,
    private _httpEventService: EventService,
    public dialogRef: MatDialogRef<EventDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
  onSubmit() {
    if (this.event) {
      this?.updateEvent(this.event?._id, this.eventForm?.value);
    } else {
      console.table(this.eventForm.value);
      this._httpEventService.addEvent(this.eventForm?.value).subscribe(
        (sucess) => this.sucessMessage(), //TODO:SUCESS MESSAGE METHOD 
        (error) => console.log(error),
        () => console.log('complete') //TODO: ERROR MESSAGES 
      );
    }
  }

  onCancel() {
    this.message = {
      taskName: 'Form',
      title: 'Are you sure you want to exit this form?',
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
    console.table(event);
    this._httpEventService.updateEvent(id, event).subscribe({
      next: (event) => {
        console.log(JSON.stringify(event) + ' has been updated');
        console.log(' event has been updated');
      },
      error: (err) => console.log(err), //TODO: ERROR MESSAGE 
    });
  }
  get name() {
    return this.eventForm.get('name');
  }
  sucessMessage() {
    //TODO
    // Display sucess message - Event created
    // Close form
    // display home page
    // IF is onEdit display message => event updated
    // close form and display event details page
  }
}
