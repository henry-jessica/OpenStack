import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeginComponent } from './components/begin/begin.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import {HomeComponent} from './components/home/home.component'; 
import { LoginComponent } from './login/login.component';
// import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: 'events/:id', component: EventDetailsComponent },
  { path: '', component: LoginComponent },
  { path: '#', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/evens/:id', component: EventDetailsComponent },
  // { path: 'begin', component: BeginComponent },
  { path: '**', component: HomeComponent },
  // { path: 'home', component: BeginComponent, canActivate:[AuthGuard] },
  { path:'login', component:LoginComponent},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
