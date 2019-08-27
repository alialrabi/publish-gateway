import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBroadcast } from 'app/shared/model/core/broadcast.model';

type EntityResponseType = HttpResponse<IBroadcast>;
type EntityArrayResponseType = HttpResponse<IBroadcast[]>;

@Injectable({ providedIn: 'root' })
export class BroadcastService {
  public resourceUrl = SERVER_API_URL + 'services/core/api/broadcasts';
  public resourceSearchUrl = SERVER_API_URL + 'services/core/api/_search/broadcasts';

  constructor(protected http: HttpClient) {}

  create(broadcast: IBroadcast): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(broadcast);
    return this.http
      .post<IBroadcast>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(broadcast: IBroadcast): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(broadcast);
    return this.http
      .put<IBroadcast>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBroadcast>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBroadcast[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBroadcast[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(broadcast: IBroadcast): IBroadcast {
    const copy: IBroadcast = Object.assign({}, broadcast, {
      deliveryDateTime:
        broadcast.deliveryDateTime != null && broadcast.deliveryDateTime.isValid() ? broadcast.deliveryDateTime.toJSON() : null,
      createdDateTime: broadcast.createdDateTime != null && broadcast.createdDateTime.isValid() ? broadcast.createdDateTime.toJSON() : null,
      updatedDateTime: broadcast.updatedDateTime != null && broadcast.updatedDateTime.isValid() ? broadcast.updatedDateTime.toJSON() : null,
      publishondatetime:
        broadcast.publishondatetime != null && broadcast.publishondatetime.isValid() ? broadcast.publishondatetime.toJSON() : null,
      publishdatetime: broadcast.publishdatetime != null && broadcast.publishdatetime.isValid() ? broadcast.publishdatetime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.deliveryDateTime = res.body.deliveryDateTime != null ? moment(res.body.deliveryDateTime) : null;
      res.body.createdDateTime = res.body.createdDateTime != null ? moment(res.body.createdDateTime) : null;
      res.body.updatedDateTime = res.body.updatedDateTime != null ? moment(res.body.updatedDateTime) : null;
      res.body.publishondatetime = res.body.publishondatetime != null ? moment(res.body.publishondatetime) : null;
      res.body.publishdatetime = res.body.publishdatetime != null ? moment(res.body.publishdatetime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((broadcast: IBroadcast) => {
        broadcast.deliveryDateTime = broadcast.deliveryDateTime != null ? moment(broadcast.deliveryDateTime) : null;
        broadcast.createdDateTime = broadcast.createdDateTime != null ? moment(broadcast.createdDateTime) : null;
        broadcast.updatedDateTime = broadcast.updatedDateTime != null ? moment(broadcast.updatedDateTime) : null;
        broadcast.publishondatetime = broadcast.publishondatetime != null ? moment(broadcast.publishondatetime) : null;
        broadcast.publishdatetime = broadcast.publishdatetime != null ? moment(broadcast.publishdatetime) : null;
      });
    }
    return res;
  }
}
