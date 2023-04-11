import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated(): Promise<boolean> {
    return Auth.currentAuthenticatedUser()
      .then(user => {
        if (user) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      })
      .catch(() => {
        return Promise.resolve(false);
      });
  }
}
