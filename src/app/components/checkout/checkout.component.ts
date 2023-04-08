import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { EventService } from 'app/services/event.service';
import { Auth } from 'aws-amplify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  counties?: string[];
  countyFile='./county.json'; 
  ticketsSelected: any;
  selectedTickets: any;
  event: any;
  constructor(private http: EventService, public authenticator: AuthenticatorService, private route: ActivatedRoute) { 
  }
  selectedGender?: string;
  // newOrder: FormGroup = new FormGroup({});

  
  ngOnInit(): void {
    this.counties = this.http.counties; 
    
    const queryParams = this.route.snapshot.queryParams;
     this.ticketsSelected = JSON.parse(queryParams['tickets']);
     this.event = JSON.parse(queryParams['event']);

    console.log(this.event); 
    
    // this.newOrder = new FormGroup({
    //   username: new FormControl(),
    //   surname: new FormControl(),
    //   email: new FormControl(),
    //   gender: new FormControl(),
    //   dob: new FormControl(),
    //   county: new FormControl(),
    //   // address: new FormGroup({
    //   //   city: new FormControl(),
    //   //   county: new FormControl(),
    //   //   line1: new FormControl(),
    //   //   eircode: new FormControl(),
    //   // }),

    // });


    console.log('test', this.authenticator.user); 
  }

  onSubmit() {
// console.log(this.newOrder); 

    }
  
    createArrayFromQuantity(quantity: number): { index: number, quantity: number }[] {
      return Array.from({ length: quantity }, (_, index) => ({ index: index + 1, quantity }));
    }
    
    
  }



