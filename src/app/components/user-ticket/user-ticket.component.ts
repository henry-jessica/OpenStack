import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventService } from 'app/services/event.service';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss']
})
export class UserTicketComponent implements OnInit {

  constructor(private http: EventService) { }
  newOrder: FormGroup = new FormGroup({});
  counties?: string[];
  @Input() ticket: any; 
  @Input() index?: number;

  ngOnInit(): void {

    console.log('ticket: ', this.ticket); 
    this.counties = this.http.counties; 
    this.newOrder = new FormGroup({
      username: new FormControl(),
      surname: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      dob: new FormControl(),
      county: new FormControl(),
      // address: new FormGroup({
      //   city: new FormControl(),
      //   county: new FormControl(),
      //   line1: new FormControl(),
      //   eircode: new FormControl(),
      // }),
  
    });
    
  }


  onSubmit() {
    console.log(this.newOrder); 
    }
  
}
