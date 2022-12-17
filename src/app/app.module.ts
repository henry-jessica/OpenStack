import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MessagesComponent } from './components/messages/messages.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BeginComponent } from './components/begin/begin.component';
// Import the module from the SDK
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { MatMenuModule } from '@angular/material/menu';
import { environment } from 'environments/environment';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth.state';


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
    BeginComponent,


  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatMenuModule,

    AuthModule.forRoot({
      domain: 'dev-zxkcix0u0cipypz8.eu.auth0.com',
      clientId: 'tGDugZvGb9UhwjJIBajPGqhcJEPuh09E',
      httpInterceptor: {
        allowedList: [`${environment.apiUri}/api/events`],
      },
    }),

    // state management
    NgxsModule.forRoot([AuthState]),
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent], 
  entryComponents:[EventFormComponent], 

})
export class AppModule { }
