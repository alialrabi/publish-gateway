import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAddress } from 'app/shared/model/core/address.model';

type EntityResponseType = HttpResponse<IAddress>;
type EntityArrayResponseType = HttpResponse<IAddress[]>;

@Injectable({ providedIn: 'root' })
export class AddressService {
  public resourceUrl = SERVER_API_URL + 'services/core/api/addresses';
  public resourceSearchUrl = SERVER_API_URL + 'services/core/api/_search/addresses';

  constructor(protected http: HttpClient) {}

  create(address: IAddress): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(address);
    return this.http
      .post<IAddress>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(address: IAddress): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(address);
    return this.http
      .put<IAddress>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAddress>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAddress[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAddress[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(address: IAddress): IAddress {
    const copy: IAddress = Object.assign({}, address, {
      createdDateTime: address.createdDateTime != null && address.createdDateTime.isValid() ? address.createdDateTime.toJSON() : null,
      updatedDateTime: address.updatedDateTime != null && address.updatedDateTime.isValid() ? address.updatedDateTime.toJSON() : null
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
      res.body.forEach((address: IAddress) => {
        address.createdDateTime = address.createdDateTime != null ? moment(address.createdDateTime) : null;
        address.updatedDateTime = address.updatedDateTime != null ? moment(address.updatedDateTime) : null;
      });
    }
    return res;
  }
}
