import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { IEvent } from '../../Interfaces/event-interface';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';
import { MessagesComponent } from '../messages/messages.component';
import { IMessages } from 'app/Interfaces/message-interface';
import { AuthService as AuthAPIService } from '../../services/auth.service';
import { DOCUMENT } from '@angular/common';
// import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  
  // userRole:string="user"; 
  event:IEvent | undefined; 
  id?:string;
  message?:IMessages; 
  displaySucessMessage: boolean=false;
  isShow:boolean = false; 
  userGroup: string | null = '';
  
  private sub: any;
  private dialogRef?: MatDialogRef<EventFormComponent>
  private dialogRef2?: MatDialogRef<MessagesComponent>
  
  constructor(private _httpEvent: EventService, private route:ActivatedRoute, private dialog:MatDialog, private _router: Router,
    @Inject(DOCUMENT) public document: Document,
    // public auth: AuthService,
    private router: Router,
    private _httpAuthService: AuthAPIService
    ) {
    this.route.params
    .subscribe(params=>console.log(params)); 
   }

  //  isAuthenticated$ = this.auth.isAuthenticated$;

  ngOnInit(): void {   
    this.userGroup =  localStorage.getItem('userGroup'); 
    this.id = this.route.snapshot.params['id'];
    this.getEvent(); 
    // this.getUserRole();


  }
  getEvent():boolean{
    this._httpEvent.getEventById(this.id).subscribe(
      event => {
        this.event=event; 
        this.event = this.event;   
      }, 
      // error=> this.errorMessage = <any>error TODO  error Message
    ); 
    return false; 
    }


  // getUserRole() {
  //   console.log('CALLED  ');

  //   this.auth.user$.subscribe((user) => {
  //     console.log('USER ==> ', user?.sub);
  //     console.log('this.userId', user?.sub);
  //     const res =
  //       user?.sub &&
  //       this._httpAuthService.getUserRole(user?.sub).subscribe((res) => {
  //         console.log('USER ROLE: ', res[0].name);
  //         this.userRole = res[0].name; 
  //       });
  //   });
  // }

    cancel(){
      this.isShow = false; 
      this.displaySucessMessage=false; 
    }
    confirm(){
      this.isShow=false; 
      this.displaySucessMessage=true; 
      
    }
    onEditEvent(){
      const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false; 
      dialogConfig.autoFocus = false; 
      dialogConfig.width ='97%',
      dialogConfig.height = '97%',
      dialogConfig.data= this.event,
      this.dialogRef= this.dialog.open(EventFormComponent,dialogConfig);
    }
    onDelete(){
      this.message={
        taskName:'Delete',
        title:'Are you sure to delete? ', 
        subtitle:'If you delete this event,it will be permanently deleted.', 
        btntext1:'Yes, delete', 
        btntext2:'No, dont delete'}

      const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false; 
      dialogConfig.autoFocus = false; 
      dialogConfig.width = "80%";
      dialogConfig.height = "80%";
      this.dialogRef2 = this.dialog.open(MessagesComponent, {data:{ event: this.event, message: this.message}
      });

      this.dialogRef2.afterClosed().subscribe(result=>{
        if(result.option=='deleteConfirmed'){
          if (this.event) {
            this._httpEvent.deleteEvent(this.event._id)
              .subscribe({
                next: event => {
                  console.log(JSON.stringify(event) + ' has been delettted');
                  //TODO - Message with timer informing about event deleted 
                  this._router.navigate(['home'])
                },
                error: (err) => console.log(err) //TODO ERROR MESSAGE
              });
          } 
        }
        else{
          this.dialogRef2?.close(); 
        }
      })
    }
  }

