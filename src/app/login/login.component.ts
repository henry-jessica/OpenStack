import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router, public authenticator: AuthenticatorService ) {
    // if(this.authenticator?.user){
    //   this._router.navigateByUrl('checkout');

    // }

   }

  ngOnInit(): void {
    console.log(this.authenticator?.user); 
    // console.log('codigo user group', this.authenticator.user?.getSignInUserSession()?.getAccessToken()?.payload['cognito:groups'][0]);

  }

  onCheckRoute(UserGroup:string):boolean{
    if(UserGroup == 'manager'){
      localStorage.setItem('userGroup','manager')  
    }
    else{
      localStorage.setItem('userGroup','user')
      console.log('I am here'); 
      // this._router.navigateByUrl('profile');
    }
    console.log('here', UserGroup); 

    this._router.navigateByUrl('home');

    return false; 
  }
  

}
