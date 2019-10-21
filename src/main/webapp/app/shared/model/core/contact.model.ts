import { Moment } from 'moment';

export interface IContact {
  id?: number;
  nameFirst?: string;
  nameLast?: string;
  title?: string;
  company?: string;
  contactImageContentType?: string;
  contactImage?: any;
  createdByUser?: string;
  createdDateTime?: Moment;
  updatedByUser?: string;
  updatedDateTime?: Moment;
  status?: string;
  domain?: string;
}

export class Contact implements IContact {
  constructor(
    public id?: number,
    public nameFirst?: string,
    public nameLast?: string,
    public title?: string,
    public company?: string,
    public contactImageContentType?: string,
    public contactImage?: any,
    public createdByUser?: string,
    public createdDateTime?: Moment,
    public updatedByUser?: string,
    public updatedDateTime?: Moment,
    public status?: string,
    public domain?: string
  ) {}
}
