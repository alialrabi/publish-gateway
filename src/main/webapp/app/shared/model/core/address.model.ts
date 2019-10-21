import { Moment } from 'moment';
import { IContact } from 'app/shared/model/core/contact.model';

export const enum AddressType {
  WORK = 'WORK',
  HOME = 'HOME'
}

export interface IAddress {
  id?: number;
  address1?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  createdByUser?: string;
  createdDateTime?: Moment;
  updatedByUser?: string;
  updatedDateTime?: Moment;
  status?: string;
  domain?: string;
  addressType?: AddressType;
  contact?: IContact;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public address1?: string,
    public city?: string,
    public state?: string,
    public zipcode?: string,
    public country?: string,
    public createdByUser?: string,
    public createdDateTime?: Moment,
    public updatedByUser?: string,
    public updatedDateTime?: Moment,
    public status?: string,
    public domain?: string,
    public addressType?: AddressType,
    public contact?: IContact
  ) {}
}
