import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { IEvent } from '../../Interfaces/event-interface';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';
import { MessagesComponent } from '../messages/messages.component';
import { IMessages } from 'app/Interfaces/message-interface';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  event:IEvent | undefined; 
  id?:string;
  message?:IMessages; 
  displaySucessMessage: boolean=false;
  isShow:boolean = false; 
  private sub: any;
  private dialogRef?: MatDialogRef<EventFormComponent>
  private dialogRef2?: MatDialogRef<MessagesComponent>
  constructor(private _httpEvent: EventService, private route:ActivatedRoute, private dialog:MatDialog, private _router: Router) {
    this.route.params
    .subscribe(params=>console.log(params)); 
   }

  ngOnInit(): void {   
    console.log(this.id, 'this id')
    this.id = this.route.snapshot.params['id'];
    this.getEvent(); 
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params['id']; // (+) converts string 'id' to a number
    // });
  }
  getEvent():boolean{
    this._httpEvent.getEventById(this.id).subscribe(
      event => {
        this.event=event; 
        this.event = this.event;   
      }, 
      // error=> this.errorMessage = <any>error 
    ); 
    return false; 
    }

    cancel(){
      this.isShow = false; 
      this.displaySucessMessage=false; 
    }
    confirm(){
      this.isShow=false; 
      this.displaySucessMessage=true; 
      
    }
    // onCreateEvent(){
    //   const dialogConfig = new MatDialogConfig(); 
    //   dialogConfig.disableClose = false; 
    //   dialogConfig.autoFocus = false; 
    //   dialogConfig.width = "80%";
    //    dialogConfig.height = "80%";
    //   this.dialog.open(EventFormComponent, dialogConfig)
    // }
    onEditEvent(){
      const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false; 
      dialogConfig.autoFocus = false; 
      dialogConfig.width ='97%',
      dialogConfig.height = '97%',
      dialogConfig.data= this.event,
      this.dialogRef= this.dialog.open(EventFormComponent,dialogConfig);
    }
    onDelete(){
      this.message={
        taskName:'Delete',
        title:'Are you sure to delete? ', 
        subtitle:'If you delete this event,it will be permanently deleted.', 
        btntext1:'Yes, delete', 
        btntext2:'No, dont delete',
    }

      const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false; 
      dialogConfig.autoFocus = false; 
      dialogConfig.width = "80%";
      dialogConfig.height = "80%";
      // this.dialog.open(EventFormComponent, dialogConfig)
      this.dialogRef2 = this.dialog.open(MessagesComponent, {data:{ event: this.event, message: this.message}
      });

      this.dialogRef2.afterClosed().subscribe(result=>{
        if(result.option=='deleteConfirmed'){
          if (this.event) {
            this._httpEvent.deleteEvent(this.event._id)
              .subscribe({
                next: event => {
                  console.log(JSON.stringify(event) + ' has been delettted');
                  
                  //TODO - Message with timer informing about event deleted 
                  
                  this._router.navigate(['home'])
                },
                error: (err) => console.log(err)
              });
          } 
        }
        else{
          this.dialogRef2?.close(); 
        }
      })
    }
  }

