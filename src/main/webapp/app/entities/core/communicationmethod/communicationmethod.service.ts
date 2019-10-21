import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICommunicationmethod } from 'app/shared/model/core/communicationmethod.model';

type EntityResponseType = HttpResponse<ICommunicationmethod>;
type EntityArrayResponseType = HttpResponse<ICommunicationmethod[]>;

@Injectable({ providedIn: 'root' })
export class CommunicationmethodService {
  public resourceUrl = SERVER_API_URL + 'services/core/api/communicationmethods';
  public resourceSearchUrl = SERVER_API_URL + 'services/core/api/_search/communicationmethods';

  constructor(protected http: HttpClient) {}

  create(communicationmethod: ICommunicationmethod): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(communicationmethod);
    return this.http
      .post<ICommunicationmethod>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(communicationmethod: ICommunicationmethod): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(communicationmethod);
    return this.http
      .put<ICommunicationmethod>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICommunicationmethod>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommunicationmethod[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommunicationmethod[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(communicationmethod: ICommunicationmethod): ICommunicationmethod {
    const copy: ICommunicationmethod = Object.assign({}, communicationmethod, {
      createdDateTime:
        communicationmethod.createdDateTime != null && communicationmethod.createdDateTime.isValid()
          ? communicationmethod.createdDateTime.toJSON()
          : null,
      updatedDateTime:
        communicationmethod.updatedDateTime != null && communicationmethod.updatedDateTime.isValid()
          ? communicationmethod.updatedDateTime.toJSON()
          : null
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
      res.body.forEach((communicationmethod: ICommunicationmethod) => {
        communicationmethod.createdDateTime =
          communicationmethod.createdDateTime != null ? moment(communicationmethod.createdDateTime) : null;
        communicationmethod.updatedDateTime =
          communicationmethod.updatedDateTime != null ? moment(communicationmethod.updatedDateTime) : null;
      });
    }
    return res;
  }
}
