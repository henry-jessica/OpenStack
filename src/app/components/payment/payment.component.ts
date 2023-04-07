import { Component } from '@angular/core';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class PaymentComponent {

  constructor(private stripeService: StripeService) {}

  async checkout() {
    const stripe = await this.stripeService.loadStripe('pk_test_...');
    const result = await stripe.redirectToCheckout({
      lineItems: [{ price: 'price_...', quantity: 1 }],
      mode: 'payment',
      successUrl: 'https://yourwebsite.com/success',
      cancelUrl: 'https://yourwebsite.com/cancel',
    });
    if (result.error) {
      console.error(result.error);
    }
  }

}
