import { Moment } from 'moment';
import { IContact } from 'app/shared/model/core/contact.model';

export interface ICommunicationmethod {
  id?: number;
  valueString?: string;
  countryCode?: string;
  createdByUser?: string;
  createdDateTime?: Moment;
  updatedByUser?: string;
  updatedDateTime?: Moment;
  status?: string;
  domain?: string;
  contact?: IContact;
}

export class Communicationmethod implements ICommunicationmethod {
  constructor(
    public id?: number,
    public valueString?: string,
    public countryCode?: string,
    public createdByUser?: string,
    public createdDateTime?: Moment,
    public updatedByUser?: string,
    public updatedDateTime?: Moment,
    public status?: string,
    public domain?: string,
    public contact?: IContact
  ) {}
}
