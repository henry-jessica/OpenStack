import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { IEvent } from '../../Interfaces/event-interface';
import { EventService } from '../../services/event.service';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isShow?: boolean = false;
  // displaySucessMessage: boolean=false;
  event?: any; 
  events?:IEvent[]; 
  errorMessage:any; 
  showNav: boolean = false; 

  constructor(private _httpEventService:EventService, public dialog:MatDialog, public auth: AuthService) { }

  isAuthenticated$ = this.auth.isAuthenticated$

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated =>{
      if(isAuthenticated){
        this.showNav = true;
      }

      console.log('test',this.isAuthenticated$ )

    })

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

  // cancel(){
  //   this.isShow = false; 
  //   this.displaySucessMessage=false; 
  // }
  // confirm(){
  //   this.isShow=false; 
  //   this.displaySucessMessage=true; 
    
  // }


  }

  
