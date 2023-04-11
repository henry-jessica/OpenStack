import { QueryEntity } from '@datorama/akita';
import { User } from '../store/user.model';
import { UserState, UserStore } from '../store/user.store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserQuery extends QueryEntity<UserState, User> {
  constructor(protected override store: UserStore) {
    super(store);
  }

  override selectActive() {
    return this.selectAll({ filterBy: entity => entity.name === 'active' });
  }
}
