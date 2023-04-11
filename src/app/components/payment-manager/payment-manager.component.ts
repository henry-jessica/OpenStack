import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-manager',
  templateUrl: './payment-manager.component.html',
  styleUrls: ['./payment-manager.component.scss']
})
export class PaymentManagerComponent implements OnInit {

  @Input() order?: any; 

  constructor() {
    
  }

  ngOnInit(): void {
    //this.invokeStripe();
    this.makePayment();
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


    }

}
