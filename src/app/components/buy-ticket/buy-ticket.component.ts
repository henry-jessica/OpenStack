import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent, ITicket } from 'app/Interfaces/event-interface';

interface SelectedTicket {
  ticket: ITicket;
  quantity: number;
}

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.scss']
})


export class BuyTicketComponent implements OnInit {

  @Input() event?:IEvent;

  totalPrice:number=0;
  selectedTickets: SelectedTicket[] = [];

  constructor(public router: Router) { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
     if (changes['event']) {
     // this.totalPrice = 0;
      this.selectedTickets = [];
    }
  }
  
  onTotalPriceChange(eventData: {ticket: ITicket, totalPrice: number, operation: string}) {
    console.log('Ticket selected:', eventData.ticket);
    console.log('Total price:', eventData.totalPrice);
    console.log('Operation:', eventData.operation || 'default operation');

    if (eventData.operation == 'increment') {
      // check if ticket is already in the selected tickets array
      const selectedTicket = this.selectedTickets.find(st => st.ticket._id === eventData.ticket._id);
      console.log('selected tickets 11111',this.selectedTickets); 

      if (selectedTicket) {
        // increment the quantity of the selected ticket
        selectedTicket.quantity += 1;
      } else {
        // add the new ticket to the selected tickets array
        this.selectedTickets.push({
          ticket: eventData.ticket,
          quantity: 1
        });
      }
    } else if (eventData.operation == 'decrement') {
      // find the selected ticket
      const selectedTicket = this.selectedTickets.find(st => st.ticket._id == eventData.ticket._id);
      if (selectedTicket) {
        // decrement the quantity of the selected ticket
        selectedTicket.quantity -= 1;
        if (selectedTicket.quantity == 0) {
          // remove the ticket from the selected tickets array if the quantity is zero
          this.selectedTickets = this.selectedTickets.filter(st => st.ticket._id !== eventData.ticket._id);
        }
      }
      console.log(selectedTicket); 
    }

   // calculate the total price
   console.log('selected tickets',this.selectedTickets); 
   this.totalPrice = this.selectedTickets.reduce((total, st) => total + (st.quantity * st.ticket.price), 0);
   console.log(this.totalPrice); // move console.log statement here

  }
  getSelectedTickets(): SelectedTicket[] {
    return this.selectedTickets;
  }
  
  onCheckout() {
    const selectedTickets = this.getSelectedTickets();
    this.router.navigate(['/checkout'], { queryParams: { tickets: JSON.stringify(selectedTickets) } });
  }
  
}
