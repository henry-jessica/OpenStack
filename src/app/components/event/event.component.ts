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
  favouriteEvent?: { event: IEvent | undefined; userId: any; };

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
  // onCreateEvent(eventID?:string) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '97%';
  //   dialogConfig.height = '97%';
  //   this.dialog.open(EventDetailsComponent, {data:{id:eventID}}); 

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

  seeEvent2(){
    console.log('saveToFavourite', this.event);

    if (!this.event) {
      console.log('Event is undefined');
      return;
    }
  
    const userStr = localStorage.getItem('user');
    if (userStr !== null) {
      const user = JSON.parse(userStr);
       this.favouriteEvent = {
        event: this.event,
        userId: user._id
      };
      console.log('my object', this.favouriteEvent); 
    }
  
    console.log('it has being saved'); 
    const url = 'https://yamura76ja.execute-api.eu-west-1.amazonaws.com/dev/favourites/add';
    this.http.post(url, this.favouriteEvent).subscribe(result => {
      console.log(result); // Handle the success response
    }, error => {
      console.error(error); // Handle the error response
    });
  
  }
  
  saveToFavourite() {
    console.log('saveToFavourite'); 

//     console.log('Save to Favourite button clicked!');

//     const userStr = localStorage.getItem('user');
//     if (userStr !== null) {
//       const user = JSON.parse(userStr);
//        this.favouriteEvent = {
//         event: this.event,
//         userId: user._id
//       };
//     }
// console.log('it has being saved'); 
//     const url = 'https://yamura76ja.execute-api.eu-west-1.amazonaws.com/dev/favourites/add';
//     this.http.post(url, this.favouriteEvent).subscribe(result => {
//       console.log(result); // Handle the success response
//     }, error => {
//       console.error(error); // Handle the error response
//     });
//   }
  }
}
