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
}
