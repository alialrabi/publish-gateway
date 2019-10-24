import { EntityResponseType } from './../../social-channel/social-channel.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domain } from './domain';
import * as moment from 'moment';
import { SERVER_API_URL } from 'app/app.constants';
import { map } from 'rxjs/operators';

type EntityArrayResponseType = HttpResponse<Domain[]>;

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  public resourceUrl = SERVER_API_URL + 'services/uaa/api/domains-user';
  public resourceUrldomains = SERVER_API_URL + 'services/uaa/api/domains';

  constructor(protected http: HttpClient) {}

  getAllDomain(): Observable<EntityArrayResponseType> {
    return this.http
      .get<Domain[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  create(domain: Domain): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(domain);
    return this.http
      .post<Domain>(this.resourceUrldomains, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((domain: Domain) => {
        domain.createdDateTime = domain.createdDateTime != null ? moment(domain.createdDateTime) : null;
        domain.updatedDateTime = domain.updatedDateTime != null ? moment(domain.updatedDateTime) : null;
      });
    }
    return res;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDateTime = res.body.createdDateTime != null ? moment(res.body.createdDateTime) : null;
      res.body.updatedDateTime = res.body.updatedDateTime != null ? moment(res.body.updatedDateTime) : null;
    }
    return res;
  }

  protected convertDateFromClient(domain: Domain): Domain {
    const copy: Domain = Object.assign({}, domain, {
      createdDateTime: domain.createdDateTime != null && domain.createdDateTime.isValid() ? domain.createdDateTime.toJSON() : null,
      updatedDateTime: domain.updatedDateTime != null && domain.updatedDateTime.isValid() ? domain.updatedDateTime.toJSON() : null
    });
    return copy;
  }
}
