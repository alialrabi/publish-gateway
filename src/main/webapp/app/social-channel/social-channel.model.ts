export enum SocialChannelTypeEnum {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN'
}

export class SocialChannel {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public details?: any,
    public createdByUser?: string,
    public createdDateTime?: any,
    public updatedByUser?: string,
    public updatedDateTime?: any,
    public status?: string,
    public domain?: string,
    public channeltype?: string,
    public type?: string,
    public customerdomainId?: number
  ) {}
}
