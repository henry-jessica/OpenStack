import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Import the AuthService type from the SDK
// import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngxs/store';
import { AddAuth } from 'app/store/auth.actions';
import { AuthService as AuthAPIService } from '../../services/auth.service';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss'],
})
export class BeginComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    // public auth: AuthService,
    private router: Router,
    // private _httpEventService: AuthAPIService,
    // private store: Store
  ) {}

  // isAuthenticated$ = this.auth.isAuthenticated$;

  ngOnInit(): void {
    // this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
    //   if (isAuthenticated) {
    //     this.router.navigate(['/home']);
    //   }
    // })

    // this.getUserRole();
  }

  // getUserRole() {
  //   console.log('CALLED  ');

  //   this.auth.user$.subscribe((user) => {
  //     console.log('USER ==> ', user?.sub);
  //     console.log('this.userId', user?.sub);
  //     if(user?.sub){
  //       this.router.navigate(['/home']);
  //     }
  //     const res =
  //       user?.sub &&
  //       this._httpEventService.getUserRole(user?.sub).subscribe((res) => {
  //         console.log('USER ROLE: ', res[0]?.name);
  //         this.store.dispatch(
  //           new AddAuth({
  //             id: res[0]?.id,
  //             name: res[0]?.name,
  //             description: res[0]?.description,
  //           })
  //         );

  //       });
  //   });
  // }

  // login() {
  //   this.auth.loginWithRedirect();
  // }
}