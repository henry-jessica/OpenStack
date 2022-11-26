import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventComponent } from './components/event/event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { HeroComponent } from './components/hero/hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    EventFormComponent,
    EventComponent,
    EventListComponent,
    EventDetailsComponent,
    HeroComponent,
    MessagesComponent,


  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent], 
  entryComponents:[EventFormComponent], 

})
export class AppModule { }
