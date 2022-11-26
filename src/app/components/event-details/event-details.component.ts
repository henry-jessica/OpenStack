import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { IEvent } from '../../Interfaces/event-interface';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  // styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  event?:IEvent; 
  id?:string;
  displaySucessMessage: boolean=false;
  isShow:boolean = false; 
  private sub: any;
  constructor(private _httpEvent: EventService, private route:ActivatedRoute) {
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
}
