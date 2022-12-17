import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, throwError, catchError, tap, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { IAuth } from '../Interfaces/auth-interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataUri = (userId: string) =>
    `https://${environment.auth0.domain}/api/v2/users/${userId}/roles`;

  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${environment.MGMT_API_ACCESS_TOKEN}`
  );

  constructor(private _http: HttpClient) {}

  getUserRole(userId: string): Observable<IAuth[]> {
    console.log(this.dataUri(userId));
    return this._http
      .get<IAuth[]>(`${this.dataUri(userId)}`, { headers: this.headers })
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
