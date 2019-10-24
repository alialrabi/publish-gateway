import { User } from './../../core/user/user.model';
import { Moment } from 'moment';

export class Domain {
  public id: number;
  public name: string;
  public createdByUser: string;
  public createdDateTime: Moment;
  public updatedByUser: string;
  public updatedDateTime: Moment;
  public status: string;
  public domain: string;
  public user: User;
}
