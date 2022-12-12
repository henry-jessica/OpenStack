import { Component, OnInit } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventService } from 'app/services/event.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private _httpEventService:EventService, private dialog:MatDialog, public auth:AuthService) { }

  ngOnInit(): void {
  }
  isAuthenticated$ = this.auth.isAuthenticated$

  onCreateEvent(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "97%";
     dialogConfig.height = "97%";
    this.dialog.open(EventFormComponent, dialogConfig)
  }

  logout(){
this.auth.logout(); 
  }

}
