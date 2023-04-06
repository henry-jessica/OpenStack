import { Component, Inject, OnInit } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { EventService } from '../../services/event.service';
import { EventFormComponent } from '../event-form/event-form.component';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddAuth } from 'app/store/auth.actions';
import { AuthService as AuthAPIService } from '../../services/auth.service';
import { DOCUMENT } from '@angular/common';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth } from 'aws-amplify';
import { EventFilterService } from '../nav/navService';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: IEvent[] = [];
  isShow?: boolean = false;
  event?: any; 
  errorMessage:any; 
  showNav: boolean = false; 
  userGroup?: string;
  


  constructor(private _httpEventService:EventService, public dialog:MatDialog,private eventFilterService: EventFilterService,public authenticator: AuthenticatorService,
    @Inject(DOCUMENT) public document: Document,
    // public auth2: AuthService,
    private router: Router,
    private _httpAuthService: AuthAPIService,
    private store: Store
    ) { 
      Auth.currentAuthenticatedUser()
    .then(user => {
      this.userGroup = user.signInUserSession.accessToken.payload["cognito:groups"][0];
    })
    .catch(err => console.log(err));
    }

  // isAuthenticated$ = this.auth.isAuthenticated$

  ngOnInit(): void {

    console.log(this.userGroup); 
    // this.auth.isAuthenticated$.subscribe(isAuthenticated =>{
    //   if(isAuthenticated){
    //     this.showNav = true;
    //   }
    //   else{
    //          this.router.navigate(['']);
    //   }

    //   console.log('test',this.isAuthenticated$ )

    // })
    // this.getUserRole()
    this.eventFilterService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  getEventByLocationOrName(event:any):boolean{
    console.log(`value=${event}`);
    this._httpEventService.getEventsDataFiltering(event).subscribe(
      event => {
        this.event=event; 
        this.events= this.event;   
        this.events?.forEach(element => {
          console.log('element',element);  //TODO: IF DONT FIND THE ELEMENT NEED INFORM TO USER - CREATE MESSAGE 
        });
      }, 
      error=> this.errorMessage = <any>error 
    ); 
    return false; 
    }

  // getUserRole() {
  //   console.log('CALLED  ');

  //   this.auth2.user$.subscribe((user) => {
  //     console.log('USER ==> ', user?.sub);
  //     console.log('this.userId', user?.sub);
  //     if(user?.sub){
  //     }
  //     const res =
  //       user?.sub &&
  //       this._httpAuthService.getUserRole(user?.sub).subscribe((res) => {
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

  }

