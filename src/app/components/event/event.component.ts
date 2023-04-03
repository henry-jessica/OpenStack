import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { EventService } from '../..//services/event.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(private _eventService:EventService,  private dialog: MatDialog) { }
  
  message: string = "";
  @Input() event?: IEvent; 

  ngOnInit(): void {
  }

  deleteEvent(){
        if (this.event) { 
          this._eventService.deleteEvent(this.event._id) 
            .subscribe({ 
              next: event => { 
                console.log(JSON.stringify(event) + ' has been delettted');
                this.message = "event has been deleted"; 
              }, 
              error: (err) => this.message = err 
            }); 
        } 
  }
  // onCreateEvent(eventID?:string) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '97%';
  //   dialogConfig.height = '97%';
  //   this.dialog.open(EventDetailsComponent, {data:{id:eventID}}); 

  // }
  
}
