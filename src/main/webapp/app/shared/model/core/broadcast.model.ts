import { Moment } from 'moment';
import { IChannelPublish } from 'app/shared/model/core/channel-publish.model';

export interface IBroadcast {
  id?: number;
  fromname?: string;
  fromemail?: string;
  title?: string;
  audiencejson?: string;
  contenthtml?: string;
  deliveryDateTime?: Moment;
  tags?: string;
  status?: string;
  createdByUser?: string;
  createdDateTime?: Moment;
  updatedByUser?: string;
  updatedDateTime?: Moment;
  domain?: string;
  publishondatetime?: Moment;
  publishdatetime?: Moment;
  imageContentType?: string;
  image?: any;
  contentjson?: string;
  channel?: IChannelPublish;
}

export class Broadcast implements IBroadcast {
  constructor(
    public id?: number,
    public fromname?: string,
    public fromemail?: string,
    public title?: string,
    public audiencejson?: string,
    public contenthtml?: string,
    public deliveryDateTime?: Moment,
    public tags?: string,
    public status?: string,
    public createdByUser?: string,
    public createdDateTime?: Moment,
    public updatedByUser?: string,
    public updatedDateTime?: Moment,
    public domain?: string,
    public publishondatetime?: Moment,
    public publishdatetime?: Moment,
    public imageContentType?: string,
    public image?: any,
    public contentjson?: string,
    public channel?: IChannelPublish
  ) {}
}
