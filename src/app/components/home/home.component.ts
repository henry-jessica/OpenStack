import { Component, Inject, OnInit } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { EventService } from '../../services/event.service';
import { EventFormComponent } from '../event-form/event-form.component';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddAuth } from 'app/store/auth.actions';
import { AuthService as AuthAPIService } from '../../services/auth.service';
import { DOCUMENT } from '@angular/common';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth } from 'aws-amplify';
import { EventFilterService } from '../nav/navService';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: IEvent[] = [];
  isShow?: boolean = false;
  event?: any; 
  errorMessage:any; 
  showNav: boolean = false; 
  userGroup?: string;
  eventsFav?: any[];
  isFav:boolean = false; 
  
  constructor(private _httpEventService:EventService, public dialog:MatDialog,private eventFilterService: EventFilterService,public authenticator: AuthenticatorService,
    @Inject(DOCUMENT) public document: Document,
    private router: Router,
    private _httpAuthService: AuthAPIService,
    private store: Store
    ) { 
      Auth.currentAuthenticatedUser()
    .then(user => {

      if(user.signInUserSession.accessToken.payload["cognito:groups"][0]){
        localStorage.setItem('userGroup', JSON.stringify(this.userGroup)); 
      }
      else{
        localStorage.setItem('userGroup', JSON.stringify('user')); 
      }
    })
    .catch(err => console.log(err));
    }

  ngOnInit(): void {

    console.log(this.userGroup); 

    localStorage.setItem('manager', JSON.stringify(this.userGroup)); 
    this.eventFilterService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  getEventByLocationOrName(event:any):boolean{
    console.log(`value=${event}`);
    this._httpEventService.getEventsDataFiltering(event).subscribe(
      event => {
        this.event=event; 
        this.events= this.event;   
        this.events?.forEach(element => {
          console.log('element',element);  //TODO: IF DONT FIND THE ELEMENT NEED INFORM TO USER - CREATE MESSAGE 
        });
      }, 
      error=> this.errorMessage = <any>error 
    ); 
    return false; 
    }

    SetTabIndex(event:any)
    {
      this.isFav = false;
      console.log('this', event.index);
      if(event.index==0){
        this.getEventsByCategory('');
      } 
      if(event.index==1){
        this.getEventsByCategory('Concert');
      }
      if(event.index==2){
        this.getEventsByCategory('Sport');
      }
      if(event.index==3){
        this.getEventsByCategory('Art');
      }
      if(event.index==4){
        this.getEventFavourites(); 
        this.isFav = true; 
        console.log(this.isFav); 
      }
    }

    
    getEventsByCategory(cat:string){
      this._httpEventService.getEventsCategory(cat).subscribe(
        event => {
          this.event=event; 
          this.events= this.event;   
          this.events?.forEach(element => {
            console.log('element',element);  //TODO: IF DONT FIND THE ELEMENT NEED INFORM TO USER - CREATE MESSAGE 
          });
        }, 
        error=> this.errorMessage = <any>error 
      ); 
      return false; 
      
    }

    // getEventFavourites() {
    //   console.log('check fav')
    //   this._httpEventService.getFavouriteEvents().subscribe(
    //     response => {
    //       this.eventsFav = response
    //       console.log( 'events', this.eventsFav); 
    //       this.events.forEach(element => {
    //         console.log('element', element); //TODO: IF DONT FIND THE ELEMENT NEED INFORM TO USER - CREATE MESSAGE 
    //       });
    //     },
    //     error => this.errorMessage = <any>error
    //   );

    //   return false;
    // }
    getEventFavourites() {
      console.log('check fav')
      this._httpEventService.getFavouriteEvents().subscribe(
        response => {
          this.eventsFav = response
          console.log( 'events', this.eventsFav); 
          this.events = []; // clear events array before adding new events
          this.eventsFav.forEach(element => {
            console.log(element); 
            const eventData = {
              _id: element._id, // add missing properties or create a new object
              category: "category", // add missing properties or create a new object
              tickets: [], // add missing properties or create a new object
              views: 0, // add missing properties or create a new object
              name: element.eventData.name,
              description: element?.eventData?.description,
              contactNumber: element?.eventData?.contactNumber,
              contact_email: element?.eventData?.contact_email,
              eventDateStarts: element?.eventData?.eventDateStarts,
              eventDateEnds: element.eventData.eventDateEnds,
              urlImg: element?.eventData?.urlImg,
              address: element?.eventData?.address,
              startsPrice: element?.eventData?.startsPrice,
              refundpolicy: element?.reventData?.efundpolicy,
              currency: element?.eventData?.currency
            };
            console.log('eventData', eventData);
            this.events.push(eventData); // add eventData to events array
          });
          localStorage.setItem('favourites', JSON.stringify(this.eventsFav)); 

        },
        error => this.errorMessage = <any>error
      );
    
      return false;
    }
    
  }

