import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeginComponent } from './components/begin/begin.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import {HomeComponent} from './components/home/home.component'; 

const routes: Routes = [
  { path: 'events/:id', component: EventDetailsComponent },
  { path: '', component: BeginComponent },
  { path: '#', component: BeginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/evens/:id', component: EventDetailsComponent },
  { path: 'begin', component: BeginComponent },
  { path: '**', component: BeginComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
