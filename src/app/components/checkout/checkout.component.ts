import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { EventService } from 'app/services/event.service';
import { Auth } from 'aws-amplify';
import { ActivatedRoute } from '@angular/router';
import { UserTicketComponent } from '../user-ticket/user-ticket.component';
import { OrderService } from 'app/services/order.service';
import { EurPipe } from '../../eur.pipe';

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
  timer: any;

  order:any; 
  @ViewChildren(UserTicketComponent) userTickets!: QueryList<UserTicketComponent>;

  event: any;
  isValid: boolean = false;
  successOrder: boolean=false;
  counter: number = 10 * 60; // 10 minutes in seconds
  totalAmount?: any;
  message: any;

  constructor(private http: EventService, public authenticator: AuthenticatorService,private _httpOrderService: OrderService,private route: ActivatedRoute) { 
  }
  selectedGender?: string;
  orderForm: FormGroup = new FormGroup({}, { updateOn: 'change' });


  ngOnInit(): void {
    this.counties = this.http.counties; 
    
    this.startTimer();

    const queryParams = this.route.snapshot.queryParams;
    this.ticketsSelected = JSON.parse(queryParams['tickets']);
    this.event = JSON.parse(queryParams['event']);
    this.calculePrice(); 
  }

  calculePrice() {
    this.totalAmount = this.ticketsSelected.reduce((total: number, { ticket, quantity }: any) => {
      return total + (ticket.price * quantity);
    }, 0);
  }
  
  startTimer() {
    this.timer = setInterval(() => {
      this.counter--;
      if (this.counter <= 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
  getMinutes() {
    return Math.floor(this.counter / 60);
  }

  getSeconds() {
    return this.counter % 60;
  }
  onSubmit() {
    this.isValid = true; 
    this.errorMessage =''; 
      const formValues = this.orderForm.value;
      const userTickets = [];
      let index = 0;
  
      for (let i = 0; i < this.ticketsSelected?.length; i++) {
        
        if (!this.userTickets.get(i)?.ticketUserOwner?.valid) {
          this.isValid = false;
          this.errorMessage = 'All fields are required';
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
    
      const order = {
        eventName: this.event.name,
        eventDate: this.event.date,
        tickets: userTickets,
        totalAmount: userTickets.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0),
        customer: this.authenticator?.user?.attributes?.email,
        event: this.event
      };
  
      (order); // Log the final object
      if (this.isValid) {
        this.order = order; 
        this.isValid = true; 
        this.makePayment();  // Move makePayment method call here
    }
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
      description: this.order?.totalAmount + ( this.order?.totalAmount*0.23),
      amount: (this.order?.totalAmount + ( this.order?.totalAmount*0.23))*100,
    });
  }
  confirmpayment(stripeToken: any) {
    console.log(' // Add your code here to confirm the payment', stripeToken); 
    this._httpOrderService.addOrderDB(this.order).subscribe({
      next: (responseBody: any) => {
        console.log('Response body:', responseBody);
        // handle the response body here
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
    
    this.successOrder = true; // set successOrder to true on success
  }
  
}

