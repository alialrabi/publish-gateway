import { IUser } from 'app/core/user/user.model';

export interface IContact {
  id?: number;
  user?: IUser;
}

export class Contact implements IContact {
  constructor(public id?: number, public user?: IUser) {}
}
