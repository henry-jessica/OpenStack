import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as AuthAction from './auth.actions';
import { IAuth } from '../Interfaces/auth-interface';

export class AuthStateModel {
  auth!: IAuth;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: { id: '', name: '', description: '' },
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static getAuth(state: AuthStateModel): IAuth {
    return state.auth;
  }

  @Action(AuthAction.AddAuth)
  get(
    { patchState }: StateContext<AuthStateModel>,
    { payload }: AuthAction.AddAuth
  ): any {
    patchState({ auth: payload });
  }
}
