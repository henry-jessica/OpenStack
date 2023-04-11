import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }
  handleError: any;


   //Adding a event
   addOrder(event: any): Observable<any> {
    return this._http.post<any>('https://imwyy998da.execute-api.eu-west-1.amazonaws.com/dev/create-orders', event).pipe(
      take(1),
      map((response: { body: any; }) => response.body)
    );
  }

  addOrderDB(event: any): Observable<any> {
    return this._http.post("https://gz5aq0g6z8.execute-api.eu-west-1.amazonaws.com/dev/order", event)
      .pipe(
        map((response: any) => response.body),
        catchError(this.handleError)
      );
  }
  
}
