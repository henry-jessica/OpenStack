import { Injectable } from '@angular/core';
import { UserStore } from './user.store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userStore: UserStore) {}

  setUser(user: any) {
    this.userStore.update({ user });
  }

  clearUser() {
    this.userStore.reset();
  }
}
