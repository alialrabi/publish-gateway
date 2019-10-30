import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChannelPublish } from 'app/shared/model/core/channel-publish.model';

type EntityResponseType = HttpResponse<IChannelPublish>;
type EntityArrayResponseType = HttpResponse<IChannelPublish[]>;

@Injectable({ providedIn: 'root' })
export class ChannelPublishService {
  public resourceUrl = SERVER_API_URL + 'services/publishbroadcast/api/channels';
  public resourceSearchUrl = SERVER_API_URL + 'services/publishbroadcast/api/_search/channels';

  constructor(protected http: HttpClient) {}

  create(channel: IChannelPublish): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(channel);
    return this.http
      .post<IChannelPublish>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(channel: IChannelPublish): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(channel);
    return this.http
      .put<IChannelPublish>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChannelPublish>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChannelPublish[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChannelPublish[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(channel: IChannelPublish): IChannelPublish {
    const copy: IChannelPublish = Object.assign({}, channel, {
      createdDateTime: channel.createdDateTime != null && channel.createdDateTime.isValid() ? channel.createdDateTime.toJSON() : null,
      updatedDateTime: channel.updatedDateTime != null && channel.updatedDateTime.isValid() ? channel.updatedDateTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDateTime = res.body.createdDateTime != null ? moment(res.body.createdDateTime) : null;
      res.body.updatedDateTime = res.body.updatedDateTime != null ? moment(res.body.updatedDateTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((channel: IChannelPublish) => {
        channel.createdDateTime = channel.createdDateTime != null ? moment(channel.createdDateTime) : null;
        channel.updatedDateTime = channel.updatedDateTime != null ? moment(channel.updatedDateTime) : null;
      });
    }
    return res;
  }
}
