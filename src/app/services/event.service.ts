import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, throwError, catchError, tap, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { IEvent } from '../Interfaces/event-interface';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private dataUri = `${environment.apiUri}/api/events`;

  constructor(private _http: HttpClient) {}

  getEvents(): Observable<IEvent[]> {
    return this._http
      .get<IEvent[]>(`${this.dataUri}`)
      .pipe(retry(3), catchError(this.handleError));
  }


      // 
      // getUser(email:string): Observable<any> {
      //   return this._http
      //     .get<any>('https://yj7utnncl0.execute-api.eu-west-1.amazonaws.com/dev/get-user-database?email=s@test')
      //     .pipe(retry(3), catchError(this.handleError));
      // }
      getUser(email:string): Observable<any>{
        return this._http
        .get<any>(
           `https://yj7utnncl0.execute-api.eu-west-1.amazonaws.com/dev/get-user-database?email=${email}`
        )
        .pipe(
            tap((user: any) => {
                localStorage.setItem('user', JSON.stringify(user))
            }),
            catchError(this.hangleError2))
    } private hangleError2(err: HttpErrorResponse){
      return throwError('error: ' + err.message)
  }

      
      //https://r1tulkewqd.execute-api.eu-west-1.amazonaws.com/dev/get-user-database?email=s@test
      //https://50bqcxeszd.execute-api.eu-west-1.amazonaws.com/dev/user/
  //Adding a event
  addEvent(event: any): Observable<IEvent> {
    return this._http.post<any>(this.dataUri, event).pipe(take(1));
  }

  //Get event by name or city
  getEventsDataFiltering(keyword: string): Observable<IEvent[]> {
    return this._http
      .get<IEvent[]>(this.dataUri + '?city=' + keyword + '&&name=' + keyword)
      .pipe(tap(), catchError(this.handleError));
  }

  getEventsCategory(keyword: string): Observable<IEvent[]> {
    return this._http
      .get<IEvent[]>(this.dataUri + '?category=' + keyword)
      .pipe(tap(), catchError(this.handleError));
  }

  //Deleting a event
  deleteEvent(id: string): Observable<unknown> {
    const url = `${this.dataUri}/${id}`; // DELETE
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  //Update Event
  updateEvent(id: string, event: any): Observable<IEvent> {
    let dataUri: string = this.dataUri + '/' + id;
    return this._http
      .put<IEvent>(dataUri, event)
      .pipe(catchError(this.handleError));
  }
  // Get Event By ID
  getEventById(id: string | undefined): Observable<IEvent> {
    return this._http
      .get<IEvent>(`${this.dataUri}/${id}`)
      .pipe(tap(), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

counties = [
      "Carlow",
      "Cavan",
      "Clare",
      "Cork",
      "Donegal",
      "Dublin",
      "Galway",
      "Kerry",
      "Kildare",
      "Kilkenny",
      "Laois",
      "Leitrim",
      "Limerick",
      "Longford",
      "Louth",
      "Mayo",
      "Meath",
      "Monaghan",
      "Offaly",
      "Roscommon",
      "Sligo",
      "Tipperary",
      "Waterford",
      "Westmeath",
      "Wexford",
      "Wicklow"
    ]
  
}
