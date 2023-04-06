import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { IEvent } from '../../Interfaces/event-interface';
import { EventService } from '../../services/event.service';

@Injectable({
  providedIn: 'root'
})
export class EventFilterService {
  private filterValue = new BehaviorSubject('');

  private events: IEvent[] = [];
  private events$ = new BehaviorSubject<IEvent[]>([]);
  filterValue$ = this.filterValue.asObservable();
  private dataUri = `${environment.apiUri}/api/events`;


  constructor(private _http: HttpClient, private _httpEventService: EventService) {
    this.loadEvents();
  }

  // Load events from the server
  private loadEvents() {
    this._http.get<IEvent[]>(this.dataUri).subscribe(
      events => {
        this.events = events;
        this.events$.next(this.events); // Emit the updated events array to the subscribers
      },
      error => console.error('An error occurred while loading events:', error)
    );
  }

  //Get event by name or city
  getEventsDataFiltering(keyword: string): Observable<IEvent[]> {
    return this._http
      .get<IEvent[]>(this.dataUri + '?city=' + keyword + '&&name=' + keyword)
      .pipe(
        tap(events => {
          this.events = events;
          this.events$.next(this.events); // Emit the updated events array to the subscribers
        }),
        catchError(this.handleError)
      );
  }

  public getEvents(): Observable<IEvent[]> {
    return this.events$.asObservable();
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
