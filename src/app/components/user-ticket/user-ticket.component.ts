// import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSlideToggle } from '@angular/material/slide-toggle';
// import { AuthenticatorService } from '@aws-amplify/ui-angular';
// import { EventService } from 'app/services/event.service';

// @Component({
//   selector: 'app-user-ticket',
//   templateUrl: './user-ticket.component.html',
//   styleUrls: ['./user-ticket.component.scss']
// })
// export class UserTicketComponent implements OnInit {
//   errorMessage: string = '';
//   isValid: boolean = false; // Add isValid property
//   email: any;
//   user: any;
// slideToggle: any;
// @ViewChild('toggle') toggle: MatSlideToggle | undefined; // Reference to the slide toggle element


//   constructor(private http: EventService, public authenticator: AuthenticatorService) {
//     this.counties = this.http.counties;
//     this.ticketUserOwner = new FormGroup({
//       username: new FormControl('', [Validators.required]),
//       surname: new FormControl('', [Validators.required]),
//       email: new FormControl('', [Validators.required]),
//       gender: new FormControl('', [Validators.required]),
//       dob: new FormControl('', [Validators.required]),
//       county: new FormControl('', [Validators.required]),
//     });
    
  
//     this.ticketUserOwner.addControl('name', new FormControl());
//     this.ticketUserOwner.controls['name'].setValue(`ticketUserOwner_${this.uniqueId}_${this.ticket?._id}`);
//   }
  
//   ticketUserOwner: FormGroup = new FormGroup({});
//   counties?: string[];
//   @Input() ticket: any; 
//   @Input() index?: number;
//   @Input() uniqueId?: any;
//   @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

//   ngOnInit(): void {
    
//     // Nothing to do here, initialization was moved to the constructor
//     const test = `ticketUserOwner_${this.uniqueId}_${this.ticket?._id}`; 
//     console.log('test', test); 
//     console.log(this.ticket); 
//     this.email = this.authenticator?.user?.attributes?.email;

//   }


//   async getUser(){
//     try {
//     const user =  await this.http.getUser(this.email).toPromise()
//     this.user = user;
//      // Update the pet owner's image URL in the navigation service
//     //  this.navigationService.updateUserImage(this.petOwner?.profilePicUrl);
//     localStorage.setItem('user', JSON.stringify(this.user)); 
  
  
//     } catch (error) {
//         console.error(error);
//       }
//     }
  
    
//   onSubmit() {

//    console.log(this.ticketUserOwner.valid); 
//    this.isValid = this.ticketUserOwner.valid; // Update isValid property

//    if (!this.isValid) {
//     this.errorMessage = 'All fields are required';
//   } else {
//     this.errorMessage = '';
//   }
// }

// toggleChecked() {
//  // this.toggle.checked = !this.toggle.checked;

//   if (this.slideToggle.checked) { // check if slide toggle is activated
//     // set form values with current user details
//     this.ticketUserOwner.patchValue({
//       username: this.user.username,
//       surname: this.user.surname,
//       email: this.user.email,
//       gender: this.user.gender,
//       dob: this.user.dob,
//       county: this.user.county,
//     });
//   } else {
//     // clear form values
//     this.ticketUserOwner.patchValue({
//       username: '',
//       surname: '',
//       email: '',
//       gender: '',
//       dob: '',
//       county: '',
//     });
//   }
// }
// }
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
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
  email: any;
  user: any;
  slideToggle: any;
  @ViewChild('toggle') toggle: MatSlideToggle | undefined; // Reference to the slide toggle element

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
    this.email = this.authenticator?.user?.attributes?.email;

    this.getUser(); 
  }

  async getUser() {
    try {
      const user = await this.http.getUser(this.email).toPromise();
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
    } catch (error) {
      console.error(error);
    }
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

  toggleChecked() {
    if (this.toggle?.checked) { // Check if slide toggle is activated
      // Set form values with current user details
      this.ticketUserOwner.patchValue({
        username: this.user.username,
        surname: this.user.surname,
        email: this.user.email,
        gender: this.user.gender,
        dob: this.user.dob,
        county: this.user.county,
      });
    } else {
      // Clear form values
      this.ticketUserOwner.patchValue({
        username: '',
        surname: '',
        email: '',
        gender: '',
        dob: '',
        county: '',
      });
    }
  }
  
}
