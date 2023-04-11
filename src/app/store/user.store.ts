import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '../store/user.model';

export interface UserState extends EntityState<User> {
  activeUserId: string | null;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState, User> {
  constructor() {
    super();
  }

  setActiveUserId(id: string) {
    this.update({ activeUserId: id });
  }

  getActive(): User | undefined {
    const activeUserId = this.getValue().activeUserId;
    if (activeUserId) {
    //   return this.getEntity(activeUserId);
    }
    return undefined;
  }
}
