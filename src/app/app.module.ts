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
// import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { MatMenuModule } from '@angular/material/menu';
import { environment } from 'environments/environment';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth.state';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { LoginComponent } from './login/login.component'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatRadioModule } from '@angular/material/radio';
import { UserTicketComponent } from './components/user-ticket/user-ticket.component';
// import { MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material/datepicker';
// >>New - Configuring Auth Module
Auth.configure(awsconfig);

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
    LoginComponent,
    BuyTicketComponent,
    TicketComponent,
    CheckoutComponent,
    UserTicketComponent,
  ],
  imports: [
    MatAutocompleteModule,
    // MatDatepickerInput,
    FormsModule,
    // MatDatepickerInputEvent,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    BrowserModule,
    MatTabsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatNativeDateModule,
    MatMenuModule,
    MatRadioModule,
    AmplifyAuthenticatorModule,
    MatIconModule,
    NgxsModule.forRoot([AuthState]),
  ],
  providers: [],
  bootstrap: [AppComponent], 
  entryComponents:[EventFormComponent], 

})
export class AppModule { }
