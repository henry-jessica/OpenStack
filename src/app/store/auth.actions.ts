import { IAuth } from '../Interfaces/auth-interface';

export class AddAuth {
  static readonly type = '[Auth] Add';

  constructor(public payload: IAuth) {}
}
