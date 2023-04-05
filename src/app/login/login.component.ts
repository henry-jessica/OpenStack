import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router, public authenticator: AuthenticatorService ) { }

  ngOnInit(): void {

    console.log(this.authenticator?.user); 
  }

  onCheckRoute(UserGroup:string):boolean{
    if(UserGroup == 'manager'){
      localStorage.setItem('userGroup','manager')
     this._router.navigateByUrl('home');
  
    }
    else if(UserGroup == 'user'){
      localStorage.setItem('userGroup','user')
      // this._router.navigateByUrl('profile');
    }

    return false; 
  }
  

}
