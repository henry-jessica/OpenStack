import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { EventService } from 'app/services/event.service';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss']
})
export class UserTicketComponent implements OnInit {
  errorMessage: string = '';
  isValid: boolean = false; // Add isValid property

  constructor(private http: EventService, public authenticator: AuthenticatorService) {
    this.counties = this.http.counties;
    this.ticketUserOwner = new FormGroup({
      username: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      county: new FormControl('', [Validators.required]),
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

   console.log(this.ticketUserOwner.valid); 
   this.isValid = this.ticketUserOwner.valid; // Update isValid property

   if (!this.isValid) {
    this.errorMessage = 'All fields are required';
  } else {
    this.errorMessage = '';
  }
}

  selectCurrentUser(){

  }
}
