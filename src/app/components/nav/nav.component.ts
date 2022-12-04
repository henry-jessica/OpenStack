import { Component, OnInit } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventService } from 'app/services/event.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private _httpEventService:EventService, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  onCreateEvent(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "97%";
     dialogConfig.height = "97%";
    this.dialog.open(EventFormComponent, dialogConfig)
  }

}
