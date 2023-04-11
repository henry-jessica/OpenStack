import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITicket } from 'app/Interfaces/event-interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input() ticket?:ITicket;
@Output() totalPriceChange = new EventEmitter<{ticket: ITicket, totalPrice: number, operation: string}>();

  ticketcounter:number=0;
  ticketPrices: number=0; 
  constructor() { }

  ngOnInit(): void {
  }
  CounterTickets(ope: string) {
    let operation = '';
    if (ope == 'inc') {
      this.ticketcounter = this.ticketcounter + 1;
      operation = 'increment';
    }
    else if (ope == 'dec') {
      this.ticketcounter = this.ticketcounter - 1;
      operation = 'decrement';
    }
    if (this.ticket) {
      this.ticketPrices = this.ticketcounter * (this.ticket?.price ?? 0);
      this.totalPriceChange.emit({ ticket: this.ticket, totalPrice: this.ticketPrices, operation: operation });
      console.log(this.ticketPrices); // move console.log statement here
    }
  }
  
  
}
