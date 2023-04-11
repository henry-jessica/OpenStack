import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { UserStore } from '../store/user.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    public authenticator: AuthenticatorService,
    private userStore: UserStore
  ) { }

  ngOnInit(): void {
    console.log(this.authenticator?.user);
  }

  onCheckRoute(UserGroup: string): boolean {
    if (UserGroup == 'manager') {
      localStorage.setItem('userGroup', 'manager')
    } else {
      localStorage.setItem('userGroup', 'user')
      console.log('I am here');
      // this._router.navigateByUrl('profile');
    }
    console.log('here', UserGroup);
    this.updateUserState();

    this._router.navigateByUrl('home');

    return false;
  }

  private updateUserState(): void {
    const user = this.authenticator?.user?.attributes;
    if (user) {
      this.userStore.update({
        name: user?.['name'],
        familyName: user?.['family_name']
      });
    }
    console.log('check user', this.userStore); 
  }

}
