import { Component, Input, OnInit } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventService } from 'app/services/event.service';
// import { AuthService } from '@auth0/auth0-angular';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/store/auth.state';
import { IAuth } from 'app/Interfaces/auth-interface';
import { Observable } from 'rxjs';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from '@angular/router';
import { EventFilterService } from './navService';
import { IEvent } from 'app/Interfaces/event-interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Select(AuthState.getAuth) auth$!: Observable<IAuth>;
  userInfor?:any; 
  isLogout:boolean =false; 
  @Input() user: any; 
  isShow?: boolean = false;
  event?: any; 
  events?:IEvent[]; 
  errorMessage:any; 
  
  constructor(
    public authenticator: AuthenticatorService, private readonly  router: Router,
    private _httpEventService: EventFilterService,
    private dialog: MatDialog,

    // public auth: AuthService
  ) {}

  public userRole = '';

  ngOnInit(): void {
    console.log(this.authenticator.user); 
    this.userInfor =this.authenticator.user;  
    // this.auth$.subscribe((auth) => {
    //   console.log('AUTH ', auth);
    //   this.userRole = auth.name;
    // });
  }
  // isAuthenticated$ = this.auth.isAuthenticated$;
  async Logout() {
    this.isLogout = true; 
    this.authenticator?.signOut()
    this.router.navigate(['/login'])

}

  onCreateEvent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '97%';
    dialogConfig.height = '97%';
    this.dialog.open(EventFormComponent, dialogConfig);
  }
  
  getEventByLocationOrName(event: any): boolean {
    console.log(`value=${event}`);
    this._httpEventService.getEventsDataFiltering(event).subscribe(
      events => {
        this.events = events;
        this.events.forEach(element => {
          console.log('element', element);
        });
      },
      error => this.errorMessage = error
    );
    return true; // Return true to allow the default behavior of the input element
  }
  
    
  // logout() {
  //   this.auth.logout();
  // }
}
