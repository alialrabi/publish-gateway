import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { JhiDateUtils } from 'ng-jhipster';
import { DatePipe } from '@angular/common';
import { Facebook } from '../model/Facebook.model';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private resourceUrl = SERVER_API_URL + 'core/api/tagcategories';
  private composerPath = SERVER_API_URL + 'composer/api';

  constructor(private http: HttpClient, private dateUtils: JhiDateUtils, private datePipe: DatePipe) {}

  getDecryptedURL(url): Observable<any> {
    return this.http.post(`${this.composerPath}/aws/s3/decryption`, url);
  }

  FBLongLiveToken(shortToken) {
    return this.http.get<Facebook>(
      // tslint:disable-next-line:max-line-length
      'https://graph.facebook.com/oauth/access_token?%20grant_type=fb_exchange_token&%20client_id=531160574073603&%20client_secret=4b011aa8d93972383d7157689af67a04&%20fb_exchange_token=' +
        shortToken
    );
  }
}
