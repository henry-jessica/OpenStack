import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { EventService } from '../..//services/event.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  favouriteEvent?: { eventData: IEvent | undefined; userId: any; };
  isStarred = false;
  eventsFav?: any[];
  errorMessage: any;

  constructor(private _eventService:EventService,  private dialog: MatDialog, private route:Router, private http:HttpClient) { }
  
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
toggleStar() {
  const eventId = this.event?._id;
  if (eventId) {
    const foundEvent = this.eventsFav?.find((event: any) => event._id === eventId);
    this.isStarred = foundEvent !== undefined;
  } else {
    this.isStarred = false;
  }
}

 
  seeEvent(){

    //put event views 
    if(this.event)
    this.addViews(this.event?._id); 
    this.route.navigate(['/events', this.event?._id]);

  }
  addViews(id:string) {
    if(this.event){
    if(!this.event?.views){
      this.event.views=1; 
    }
    this.event.views+=1; // increment view count by 1
    this._eventService.updateEvent(id, this.event).subscribe({
      next: book => {
        console.log(JSON.stringify(book) + ' has been updated');
        // this.successMessage('update')
      },
      error: err => console.log(err)
    });
  }
  }
  getEventFavourites() {
    console.log('check fav')
    this._eventService.getFavouriteEvents().subscribe(
      response => {
        const events = response.map(item => item.event);
        this.eventsFav = events;
        this.eventsFav.forEach(element => {
          console.log('element', element); //TODO: IF DONT FIND THE ELEMENT NEED INFORM TO USER - CREATE MESSAGE 
        });
      },
      error => this.errorMessage = <any>error
    );
    return false;
  }

  AddEventFavourite(){
    console.log('saveToFavourite', this.event);

    if (!this.event) {
      console.log('Event is undefined');
      return;
    }
  
    const userStr = localStorage.getItem('user');
    if (userStr !== null) {
      const user = JSON.parse(userStr);
       this.favouriteEvent = {
        eventData: this.event,
        userId: user._id
      };
    }
    console.log('my object', this.favouriteEvent); 

    console.log('it has being saved'); 
    const url = 'https://yamura76ja.execute-api.eu-west-1.amazonaws.com/dev/favourites/add';
    this.http.post(url, this.favouriteEvent).subscribe(result => {
      console.log(result); // Handle the success response
    }, error => {
      console.error(error); // Handle the error response
    });
  
  }
  
}
