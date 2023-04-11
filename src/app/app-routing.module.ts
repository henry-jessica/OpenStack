import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeginComponent } from './components/begin/begin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import {HomeComponent} from './components/home/home.component'; 
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
// import { AuthGuard } from '@auth0/auth0-angular';
import { CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { AuthGuard } from './services/auth.cognito.guard';


const routes: Routes = [
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: '#', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'home/evens/:id', component: EventDetailsComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserProfileComponent, canActivate: [AuthGuard]},
  // { path: 'begin', component: BeginComponent },
  { path: '**', component: HomeComponent },
  // { path: 'home', component: BeginComponent, canActivate:[AuthGuard] },
  { path:'', component:HomeComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
