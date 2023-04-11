import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { EventService } from '../..//services/event.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { HttpClient } from '@angular/common/http';
import { AuthenticatorService } from '@aws-amplify/ui-angular';


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
  favouritesStr?: string | null;

  constructor(private _eventService:EventService,  public authenticator: AuthenticatorService, private dialog: MatDialog, private route:Router, private http:HttpClient
    
    
    ) { }
  
  message: string = "";
  @Input() event?: IEvent; 
  @Input() isFav?:boolean; 
  async ngOnInit(): Promise<void> {
    this.favouritesStr = localStorage.getItem('favourites');
    if (this.favouritesStr) {
      this.eventsFav = JSON.parse(this.favouritesStr);
    }
    console.log(this.eventsFav); 
  
    if (this.event) {
      const foundEvent = this.eventsFav?.find((event: any) => event.eventData._id === this.event?._id);
      this.isStarred = foundEvent !== undefined;
    }

    if(this.isFav){
      this.isStarred = true;

    }
  }

  
  toggleStar() {
    const eventId = this.event?._id;
    if (eventId) {
      const foundEvent = this.eventsFav?.find((event: any) => event.eventData._id === eventId);
      this.isStarred = foundEvent !== undefined;
    } else {
      this.isStarred = false;
    }
    
    if (!this.isStarred) {
      this.AddEventFavourite();
    }
    else{
       //remove 
       this.isStarred = false; 
       this.deleteFavourite(); 
    }
  }
  
  
  
    
    // this._eventService.getFavouriteEvents().subscribe(
    //   response => {
    //     const events = response.filter(item => item.event != null).map(item => item.event);
    //     this.eventsFav = events;
    //     console.log('fav',this.eventsFav); 
    //     console.log('event',events); 
    //     if (this.eventsFav.find(event => event._id === this.event?._id)) {
    //       this.isStarred = true;
    //       console.log('is fav')
    //     }
    //   },
    //   error => this.errorMessage = <any>error
    // );

deleteFavourite(){
        if (this.event) { 
          this._eventService.deleteFavourite(this.event._id) 
            .subscribe({ 
              next: event => { 
                console.log(JSON.stringify(event) + ' has been delettted');
                this.message = "event has been deleted"; 
              }, 
              error: (err) => this.message = err 
            }); 
        } 
  }

  // deleteFavourite(): void {
  //   if (!this.event) {
  //     console.log('Event is undefined');
  //     return;
  //   }
    
  //   const userStr = localStorage.getItem('user');
  //   if (userStr !== null) {
  //     const user = JSON.parse(userStr);
  //     const favouriteEvent = {
  //       eventData: this.event,
  //       userId: user._id
  //     };
    
  //     console.log('my object', favouriteEvent);
    
  //     const url = 'https://yamura76ja.execute-api.eu-west-1.amazonaws.com/dev/favourites/delete';
  //     this.http.post(url, favouriteEvent).subscribe(result => {
  //       console.log(result); // Handle the success response
        
  //       // Remove the event from the local storage
  //       const favouritesStr = localStorage.getItem('favourites');
  //       if (favouritesStr) {
  //         const favourites = JSON.parse(favouritesStr);
  //         const eventIndex = favourites.findIndex((event: any) => event._id === this.event?._id);
  //         if (eventIndex > -1) {
  //           favourites.splice(eventIndex, 1);
  //           localStorage.setItem('favourites', JSON.stringify(favourites));
  //         }
  //       }
        
  //     }, error => {
  //       console.error(error); // Handle the error response
  //     });
      
  //     this.isStarred = false;
  //   }

  //   this.deleteFavourite2(); 
  // }
  


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
// toggleStar() {
//   const eventId = this.event?._id;
//   if (eventId) {
//     const foundEvent = this.eventsFav?.find((event: any) => event._id === eventId);
//     this.isStarred = foundEvent !== undefined;
//   } else {
//     this.isStarred = false;
//   }
//   this.AddEventFavourite(); 
// }

 
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
  // getEventFavourites() {
  //   console.log('check fav')
  //   this._eventService.getFavouriteEvents().subscribe(
  //     response => {
  //       const events = response.map(item => item.event);
  //       this.eventsFav = events;
  //       this.eventsFav.forEach(element => {
  //         console.log('element', element); //TODO: IF DONT FIND THE ELEMENT NEED INFORM TO USER - CREATE MESSAGE 
  //       });
  //     },
  //     error => this.errorMessage = <any>error
  //   );
  //   return false;
  // }
  // getEventFavourites() {
  //   console.log('check fav')
  //   this._eventService.getFavouriteEvents().subscribe(
  //     response => {
  //       this.eventsFav = response
  //       console.log( 'events', this.eventsFav); 
  //       this.favouriteEvents=[]; // clear events array before adding new events
  //       this.eventsFav.forEach(element => {
  //         console.log(element); 
  //         const eventData = {
  //           _id: element._id, // add missing properties or create a new object
  //           category: "category", // add missing properties or create a new object
  //           tickets: [], // add missing properties or create a new object
  //           views: 0, // add missing properties or create a new object
  //           name: element.eventData.name,
  //           description: element?.eventData?.description,
  //           contactNumber: element?.eventData?.contactNumber,
  //           contact_email: element?.eventData?.contact_email,
  //           eventDateStarts: element?.eventData?.eventDateStarts,
  //           eventDateEnds: element.eventData.eventDateEnds,
  //           urlImg: element?.eventData?.urlImg,
  //           address: element?.eventData?.address,
  //           startsPrice: element?.eventData?.startsPrice,
  //           refundpolicy: element?.reventData?.efundpolicy,
  //           currency: element?.eventData?.currency
  //         };
  //         console.log('eventData', eventData);
  //         this.favouriteEvents?.push(eventData); // add eventData to events array
  //       });
  //       localStorage.setItem('favourites', JSON.stringify(this.favouriteEvents)); 

  //     },
  //     error => this.errorMessage = <any>error
  //   );
  
  //   return false;
  // }
  



  AddEventFavourite(){
    console.log('saveToFavourite', this.event);
    this.isStarred = true;

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
