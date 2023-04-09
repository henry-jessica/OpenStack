import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { EventService } from 'app/services/event.service';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss']
})
export class UserTicketComponent implements OnInit {

  constructor(private http: EventService, public authenticator: AuthenticatorService) {
    this.counties = this.http.counties;
    this.ticketUserOwner = new FormGroup({
      username: new FormControl(),
      surname: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      dob: new FormControl(),
      county: new FormControl(),
    });
  
    this.ticketUserOwner.addControl('name', new FormControl());
    this.ticketUserOwner.controls['name'].setValue(`ticketUserOwner_${this.uniqueId}_${this.ticket?._id}`);
  }
  
  ticketUserOwner: FormGroup = new FormGroup({});
  counties?: string[];
  @Input() ticket: any; 
  @Input() index?: number;
  @Input() uniqueId?: any;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    
    // Nothing to do here, initialization was moved to the constructor
    const test = `ticketUserOwner_${this.uniqueId}_${this.ticket?._id}`; 
    console.log('test', test); 
console.log(this.ticket); 
  }

  onSubmit() {
    this.formSubmit.emit(this.ticketUserOwner.value);
  }
  selectCurrentUser(){

  }
}
