import { Moment } from 'moment';
import { IBroadcast } from 'app/shared/model/core/broadcast.model';

export interface IChannelPublish {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  channeltype?: string;
  details?: string;
  createdByUser?: string;
  createdDateTime?: Moment;
  updatedByUser?: string;
  updatedDateTime?: Moment;
  status?: string;
  domain?: string;
  broadcasts?: IBroadcast[];
}

export class ChannelPublish implements IChannelPublish {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public channeltype?: string,
    public details?: string,
    public createdByUser?: string,
    public createdDateTime?: Moment,
    public updatedByUser?: string,
    public updatedDateTime?: Moment,
    public status?: string,
    public domain?: string,
    public broadcasts?: IBroadcast[]
  ) {}
}
