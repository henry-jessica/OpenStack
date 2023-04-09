import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }


   //Adding a event
   addOrder(event: any): Observable<any> {
    return this._http.post<any>('https://imwyy998da.execute-api.eu-west-1.amazonaws.com/dev/create-orders', event).pipe(take(1));
  }

  
}
