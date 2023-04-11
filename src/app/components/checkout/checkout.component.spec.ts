import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout.component';
import { EventService } from 'app/services/event.service';
import { UserTicketComponent } from '../user-ticket/user-ticket.component';
import { EurPipe } from '../../eur.pipe';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let eventServiceMock: jasmine.SpyObj<EventService>;

  beforeEach(async () => {
    eventServiceMock = jasmine.createSpyObj('EventService', ['getCounties']);
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent, UserTicketComponent, EurPipe],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: EventService, useValue: eventServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate the total amount correctly', () => {
    component.ticketsSelected = [
      { ticket: { price: 10 }, quantity: 2 },
      { ticket: { price: 15 }, quantity: 1 },
    ];
    component.calculePrice();
    expect(component.totalAmount).toEqual(35);
  });

  // add more tests here
});
