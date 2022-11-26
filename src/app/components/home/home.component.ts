import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  displaySucessMessage: boolean=false;
  event?: any; 
  events?:IEvent[]; 
  errorMessage:any; 

  constructor(private _httpEventService:EventService, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  getEventByLocationOrName(event:any):boolean{
    console.log(`value=${event}`);
    this._httpEventService.getEventsDataFiltering(event).subscribe(
      event => {
        this.event=event; 
        this.events= this.event;   
        this.events?.forEach(element => {
          console.log('element',element); 
        });
      }, 
      error=> this.errorMessage = <any>error 
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



}
