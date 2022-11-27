import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import {HomeComponent} from './components/home/home.component'; 

const routes: Routes = [
  { path: 'events/:id', component: EventDetailsComponent },
  { path: '', component: HomeComponent },
  { path: '#', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/evens/:id', component: EventDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
