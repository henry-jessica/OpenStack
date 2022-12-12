import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private router:Router){}

  isAuthenticated$ = this.auth.isAuthenticated$

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated =>{
      if(isAuthenticated){
        this.router.navigate(['/home'])
      }
    })
  }

  login(){
    this.auth.loginWithRedirect(); 
  }

}
