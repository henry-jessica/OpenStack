import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { AuthService as AuthAPIService } from '../../services/auth.service';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss'],
})
export class BeginComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private router: Router,
    private _httpAuthService: AuthAPIService, 

  ) {}

  isAuthenticated$ = this.auth.isAuthenticated$;

  ngOnInit(): void {
    // this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
    //   if (isAuthenticated) {
    //     this.router.navigate(['/home']);
    //   }
    // })

    this.getUserRole();
  }

  getUserRole() {
    console.log('CALLED  ');

    this.auth.user$.subscribe((user) => {
      console.log('USER ==> ', user?.sub);
      console.log('this.userId', user?.sub);
      const res =
        user?.sub &&
        this._httpAuthService.getUserRole(user?.sub).subscribe((res) => {
          console.log('USER ROLE: ', res[0].name);
          // navigate to home screen
          this.router.navigate(['/home']);
        });
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
