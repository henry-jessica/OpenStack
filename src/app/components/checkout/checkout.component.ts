import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventService } from 'app/services/event.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  counties?: string[];
  countyFile='./county.json'; 
  constructor(private http: EventService) { }
  selectedGender?: string;
  newOrder: FormGroup = new FormGroup({});

  ngOnInit(): void {
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


