import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Select(AuthState.getAuth) auth$!: Observable<IAuth>;

  constructor(
    public authenticator: AuthenticatorService, private readonly  _router: Router, 
    private _httpEventService: EventService,
    private dialog: MatDialog,
    // public auth: AuthService
  ) {}

  public userRole = '';

  ngOnInit(): void {
    this.auth$.subscribe((auth) => {
      console.log('AUTH ', auth);
      this.userRole = auth.name;
    });
  }
  // isAuthenticated$ = this.auth.isAuthenticated$;
  async Logout() {
    this.authenticator?.signOut()
    this._router.navigate(['/login'])

}

  onCreateEvent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '97%';
    dialogConfig.height = '97%';
    this.dialog.open(EventFormComponent, dialogConfig);
  }

  // logout() {
  //   this.auth.logout();
  // }
}
