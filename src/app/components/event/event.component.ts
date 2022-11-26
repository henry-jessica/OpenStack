import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { EventService } from '../..//services/event.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(private _eventService:EventService) { }
  
  message: string = "";
  @Input() event?: IEvent; 

  ngOnInit(): void {
  }

  deleteEvent(){
    console.log('deleting a event '); 
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
}
