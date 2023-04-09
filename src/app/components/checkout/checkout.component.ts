// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { AuthenticatorService } from '@aws-amplify/ui-angular';
// import { EventService } from 'app/services/event.service';
// import { Auth } from 'aws-amplify';
// import { ActivatedRoute } from '@angular/router';
// import { UserTicketComponent } from '../user-ticket/user-ticket.component';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.scss']
// })
// export class CheckoutComponent implements OnInit {
//   counties?: string[];
//   countyFile='./county.json'; 
//   ticketsSelected: any;
//   selectedTickets: any;
//   @ViewChildren(UserTicketComponent) userTickets!: QueryList<UserTicketComponent>;

//   event: any;
//   constructor(private http: EventService, public authenticator: AuthenticatorService, private route: ActivatedRoute) { 
//   }
//   selectedGender?: string;
//   orderForm: FormGroup = new FormGroup({});

//   // newOrder: FormGroup = new FormGroup({});

  
//   ngOnInit(): void {
//     this.counties = this.http.counties; 


//     const queryParams = this.route.snapshot.queryParams;
//      this.ticketsSelected = JSON.parse(queryParams['tickets']);
//      this.event = JSON.parse(queryParams['event']);

//     console.log(this.event); 
//     console.log('test', this.authenticator.user); 
//   }
  
//   onSubmit() {
//   if (this.orderForm.valid) {
//     const formValues = this.orderForm.value;
//     const userTickets = [];
//     let index = 0;

//     for (let i = 0; i < this.ticketsSelected?.length; i++) {
//       for (let j = 0; j < this.ticketsSelected[i].quantity; j++) {
//         const ticketUserOwner = this.userTickets.toArray()[index]?.ticketUserOwner;

//         if (ticketUserOwner?.valid) {
//           const ticketData = ticketUserOwner.value;
//           const userTicket = {
//             ticketId: this.ticketsSelected[i].ticket._id,
//             ...ticketData,
//           };
//           userTickets.push(userTicket);
//           console.log(userTicket); // Log the form values
//         }
//         index++;
//       }
//     }
//   }
// }

//     createArrayFromQuantity(quantity: number): any[] {
//       return Array.from({ length: quantity }, (_, index) => index);
//     }
    
    
//   }




//////////

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { EventService } from 'app/services/event.service';
import { Auth } from 'aws-amplify';
import { ActivatedRoute } from '@angular/router';
import { UserTicketComponent } from '../user-ticket/user-ticket.component';
import { OrderService } from 'app/services/order.service';

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
  errorMessage: string = '';

  order:any; 
  @ViewChildren(UserTicketComponent) userTickets!: QueryList<UserTicketComponent>;

  event: any;
  isValid: boolean = false;
  constructor(private http: EventService, public authenticator: AuthenticatorService,private _httpOrderService: OrderService,private route: ActivatedRoute) { 
  }
  selectedGender?: string;
  orderForm: FormGroup = new FormGroup({}, { updateOn: 'change' });
  
  ngOnInit(): void {
    this.counties = this.http.counties; 

    const queryParams = this.route.snapshot.queryParams;
    this.ticketsSelected = JSON.parse(queryParams['tickets']);
    this.event = JSON.parse(queryParams['event']);

    console.log(this.event); 
    console.log('test', this.authenticator.user); 
  }

  onSubmit() {
    console.log(this.orderForm.valid); 
    this.isValid = true; 
    this.errorMessage =''; 
      const formValues = this.orderForm.value;
      const userTickets = [];
      let index = 0;
  
      for (let i = 0; i < this.ticketsSelected?.length; i++) {
        
        if (!this.userTickets.get(i)?.ticketUserOwner?.valid) {
          this.isValid = false;
          console.log(this.isValid); 
          this.errorMessage = 'All fields are required';
          console.log(this.errorMessage); 
          break;
        }
        const ticketData = this.ticketsSelected[i].ticket;
        const ticketQuantity = this.ticketsSelected[i].quantity;
        const tickets = [];
  
        for (let j = 0; j < ticketQuantity; j++) {
          const ticketUserOwner = this.userTickets.toArray()[index]?.ticketUserOwner;
  
          if (ticketUserOwner?.valid) {
            const userTicket = {
              ticketId: ticketData._id,
              ...ticketUserOwner.value,
            };
            tickets.push(userTicket);
          }
          index++;
        }
  
        if (tickets.length > 0) {
          userTickets.push({
            ticketId: ticketData._id,
            ticketType: ticketData.ticketType,
            price: ticketData.price,
            quantity: ticketQuantity,
            users: tickets,
          });
        }
      }
  
      const customer = {
        name: `${formValues.firstName} ${formValues.lastName}`,
        email: formValues.email,
        address: formValues.address,
        city: formValues.city,
        state: formValues.state,
        zip: formValues.zip,
      };
  
      const order = {
        eventName: this.event.name,
        eventDate: this.event.date,
        tickets: userTickets,
        totalAmount: userTickets.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0),
        customer: customer,
      };
  
      console.log(order); // Log the final object
      if (this.isValid) {
        // code to create order object
        console.log(order); // Log the final object
        this.order = order; 
        this.isValid = true; 
        this.makePayment();  // Move makePayment method call here
    }
      // this._httpOrderService.addOrder(order).subscribe(
      //   sucess => this.sucessMessage('submit'),
      //   error => console.log(error),
      //   () => console.log("complete")
      // );

    
  }
  sucessMessage(arg0: string): void {
    throw new Error('Method not implemented.');
  }

  createArrayFromQuantity(quantity: number): any[] {
    return Array.from({ length: quantity }, (_, index) => index);
  }



  makePayment() {
    // if(doAction=='Confirm'){
        const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MWB7YAoSiviOVuvgwBp0jfYUIN2ype1syfcNPSMq6jIxJeCAnMCfwB1ddbez4r5zo4sSOStblgpJ2gWJmbjG6bO00oC3DWa5K',
      locale: 'auto',
      token: (stripeToken: any) => {
        this.confirmpayment(stripeToken);
      },
    });
    paymentHandler.open({
      name: 'EasyEvent',
      description: this.order?.totalAmount,
      amount: this.order?.totalAmount * 100,
    });
    // }
  }

  confirmpayment(stripeToken: any) {
    console.log(' // Add your code here to confirm the payment', stripeToken); 
      this._httpOrderService.addOrder(this.order).subscribe(
        sucess => this.sucessMessage('submit'),
        error => console.log(error),
        () => console.log("complete")
      );

    }
}

