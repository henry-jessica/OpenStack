import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEvent } from '../../Interfaces/event-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  // styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  @Input() isShow?: boolean; 
  @Input() event?:any;
  @Input() formTitle?:string; 
  @Input() BtnName?:string; 
   
  @Output() cancel: EventEmitter<null> = new EventEmitter<null>();
  @Output() confirm: EventEmitter<null>=new EventEmitter<null>(); 
  
  eventForm : FormGroup = new FormGroup({}); 
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(private _httpEventService:EventService) { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      name: new FormControl ('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl ('', [Validators.required]),
      contactNumber: new FormControl(''),
      contact_email: new FormControl,
      eventDateStarts: new FormControl(''),
      eventDateEnds: new FormControl(''),
      startsPrice:  new FormControl(''),
      urlImg:new FormControl(''),
      address: new FormGroup({
        city: new FormControl(''),
        county: new FormControl(''), 
        line1: new FormControl(''),
        eircode: new FormControl(''), 
        })
      })
  }
  onSubmit(){
    console.log('forms submitted with ');
    console.table(this.eventForm.value);
    this._httpEventService.addEvent(this.eventForm.value).subscribe(
      sucess=> console.log("sucess"), 
      error=> console.log(error), 
      () => console.log("complete")
    ); 
//    this.eventForm.emit(this.eventForm?.value); 
  }

  get name() {
    return this.eventForm.get('name');
  }
  Cancel() {
    this.cancel.emit();
  }
  Confirm(){
    this.confirm.emit(); 
  }

}
