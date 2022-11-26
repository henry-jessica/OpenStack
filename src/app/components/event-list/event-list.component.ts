import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  constructor(private _eventService:EventService) { }
  @Input() eventList?: IEvent[];
  message:string = ""; 

  ngOnInit(): void {
    // if(!this.eventList){
      this._eventService.getEvents().subscribe({
        next: (value: IEvent[] )=> this.eventList = value,
        complete: () => console.log('event service finished'),
        error: (mess) => this.message = mess
      })
    // }
  }
}
