import { Component, Inject, OnInit } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventService } from 'app/services/event.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
// Import the AuthService type from the SDK
import { AuthService as AuthAPIService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  userRole: string = ""; 
  constructor(
    private dialog: MatDialog,
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private router: Router,
    private _httpAuthService: AuthAPIService, 
  ) {}

  ngOnInit(): void {
    this.getUserRole(); 
  }
  isAuthenticated$ = this.auth.isAuthenticated$;

  onCreateEvent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '97%';
    dialogConfig.height = '97%';
    this.dialog.open(EventFormComponent, dialogConfig);
  }

  logout() {
    this.auth.logout();
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
          this.userRole = res[0].name; 
          // navigate to home screen
          this.router.navigate(['/home']);
        });
    });
  }

}
