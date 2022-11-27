import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  
  @Output()deleteConfirmed = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<MessagesComponent>, private dialog:MatDialog, public dialogRef2: MatDialogRef<EventDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('message', this.data);
  }

  ngOnInit(): void {
  }

doNotCancel(){
  this.dialogRef.close();  

}
onCancel(){
  this.dialog.closeAll();  

  if(this.data.message.taskName='Delete'){
    this.dialogRef.close({option:'deleteConfirmed'}); 
  }
}
}

