import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../app.constants';
import { JhiDateUtils } from 'ng-jhipster';
import { DatePipe } from '@angular/common';
import { Facebook } from '../model/Facebook.model';
import { ISocial } from './ISocial';
@Injectable({ providedIn: 'root' })
export class FacebookService implements ISocial {
  resourceUrl = SERVER_API_URL + 'services/core/api/social';

  constructor(private http: HttpClient, private dateUtils: JhiDateUtils, private datePipe: DatePipe) {}

  FBLongLiveToken(shortToken) {
    return this.http.get<Facebook>(
      // tslint:disable-next-line:max-line-length
      'https://graph.facebook.com/oauth/access_token?%20grant_type=fb_exchange_token&%20client_id=531160574073603&%20client_secret=4b011aa8d93972383d7157689af67a04&%20fb_exchange_token=' +
        shortToken
    );
  }
  share(content: any) {
    return this.http.post(`${this.resourceUrl}/facebook/share`, content, { observe: 'response' });
  }
}
