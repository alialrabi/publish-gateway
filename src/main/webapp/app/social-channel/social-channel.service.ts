// import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { createRequestOption } from '../shared';
import { SocialChannel } from './social-channel.model';
import { map } from 'rxjs/operators';

// import * as Crypto from 'crypto-js';
// import { Facebook } from '../entities/channel-skywriter/facebook.model';

export type EntityResponseType = HttpResponse<SocialChannel>;

@Injectable()
export class SocialChannelService {
  private resourceUrl = SERVER_API_URL + 'services/publishbroadcast/api/channels';
  private resourceUrlAccessToken = SERVER_API_URL + 'channel/api/getchannels';
  private resourceSearchUrl = SERVER_API_URL + 'channel/api/_search/channels';
  private findChannelByTypeAndDomain = SERVER_API_URL + 'channel/api/findchannels';
  private composerUrl = SERVER_API_URL + 'services/publishbroadcast/api/social';

  // CryptoJS = Crypto;
  ConsumerSecret = 'L3vw5UUSz4P5lz8b6BBnZ1a6eujU9EYpx8qftd2hEjNsSPLWl9';
  Oauth_timestamp: any;
  Oauth_nonce: string;
  Oauth_consumerkey = 'qG5dE0OWiUub3NQfsimsMm4pv';

  constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

  // getLongLiveAccessToken(shortToken) {
  //     return this.http.get<Facebook>(
  //         // tslint:disable-next-line:max-line-length
  //         'https://graph.facebook.com/oauth/access_token?%20grant_type=fb_exchange_token&%20client_id=149407212440672&%20client_secret=bd23eca9d9695b784682ba5b3c74bbe7&%20fb_exchange_token=' +
  //         shortToken
  //     );
  // }

  create(channel: SocialChannel): Observable<EntityResponseType> {
    const copy = this.convert(channel);
    return this.http
      .post<SocialChannel>(this.resourceUrl, copy, {
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }
  createWithAccessToken(channel: SocialChannel): Observable<EntityResponseType> {
    const copy = this.convert(channel);
    return this.http
      .post<SocialChannel>(this.resourceUrlAccessToken, copy, {
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }
  update(channel: SocialChannel): Observable<EntityResponseType> {
    const copy = this.convert(channel);
    return this.http
      .put<SocialChannel>(this.resourceUrl, copy, {
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<SocialChannel>(`${this.resourceUrl}/${id}`, {
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  getChannelsByDOmainAndType(domain: any, type: any): Observable<HttpResponse<SocialChannel[]>> {
    return this.http
      .get<SocialChannel[]>(this.resourceUrl + '/' + 'type' + '/' + type, {
        observe: 'response'
      })
      .pipe(map((res: HttpResponse<SocialChannel[]>) => this.convertArrayResponse(res)));
  }
  getChannelByDOmainAndType(domain: any, type: any): Observable<HttpResponse<SocialChannel>> {
    return this.http
      .get<SocialChannel>(this.findChannelByTypeAndDomain + '/' + domain + '/' + type, {
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  query(req?: any): Observable<HttpResponse<SocialChannel[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<SocialChannel[]>(this.resourceUrl, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: HttpResponse<SocialChannel[]>) => this.convertArrayResponse(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
      observe: 'response'
    });
  }

  search(req?: any): Observable<HttpResponse<SocialChannel[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<SocialChannel[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: HttpResponse<SocialChannel[]>) => this.convertArrayResponse(res)));
  }

  // channelByTagsAndDomain(word: any, tag: any[], domain: any, req?: any): Observable<any> {
  //     return this._http.post(`${this.resourceUrl}/search/${word}/${domain}`, tag, {
  //         params: req,
  //     });
  // }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: SocialChannel = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(res: HttpResponse<SocialChannel[]>): HttpResponse<SocialChannel[]> {
    const jsonResponse: SocialChannel[] = res.body;
    const body: SocialChannel[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object to ChannelSkywriter.
   */
  private convertItemFromServer(channel: SocialChannel): SocialChannel {
    const copy: SocialChannel = Object.assign({}, channel);
    copy.createdDateTime = this.dateUtils.convertDateTimeFromServer(channel.createdDateTime);
    copy.updatedDateTime = this.dateUtils.convertDateTimeFromServer(channel.updatedDateTime);
    return copy;
  }

  /**
   * Convert a ChannelSkywriter to a JSON which can be sent to the server.
   */
  private convert(channel: SocialChannel): SocialChannel {
    const copy: SocialChannel = Object.assign({}, channel);

    copy.createdDateTime = this.dateUtils.toDate(channel.createdDateTime);

    copy.updatedDateTime = this.dateUtils.toDate(channel.updatedDateTime);
    return copy;
  }

  ////////////////////////////////////////////////////////////////////////////////////

  // callTwLogin(): void {
  //     const url = 'https://api.twitter.com/oauth/request_token';
  //     const callback = encodeURIComponent('http://127.0.0.1/');
  //     // const body = {
  //     //     oauth_callback: callback,
  //     // };
  //     this.Oauth_timestamp = new Date().getTime(); // We create a timestamp in seconds.
  //     this.Oauth_nonce = '345346234246806674321vr34tb512'; // We create a 32-long random string.
  //     this.http
  //         .post(url, {
  //             headers: new HttpHeaders().set(
  //                 'Authorization',
  //                 'OAuth oauth_callback="' +
  //                     callback +
  //                     '", oauth_consumer_key="' +
  //                     this.Oauth_consumerkey +
  //                     '", oauth_nonce="' +
  //                     this.Oauth_nonce +
  //                     '", oauth_signature="' +
  //                     encodeURIComponent(this.createSignature()) +
  //                     '", oauth_signature_method="HMAC-SHA1", oauth_timestamp="' +
  //                     this.Oauth_timestamp +
  //                     '", oauth_version="1.0"',
  //             ),
  //         })
  //         .subscribe(rsp => console.log('Twitter: ' + rsp));
  // }

  // createSignature(): string {
  //     let callback = 'http://127.0.0.1/';
  //     let rawURL: string = 'POST&' + encodeURIComponent('https://api.twitter.com/oauth/request_token') + '&';
  //     let parameterString: string =
  //         'oauth_callback=' +
  //         callback +
  //         '&oauth_consumer_key=' +
  //         this.Oauth_consumerkey +
  //         '&oauth_nonce=' +
  //         this.Oauth_nonce +
  //         '&oauth_signature_method=HMAC-SHA1' +
  //         '&oauth_timestamp=' +
  //         this.Oauth_timestamp +
  //         '&oauth_version=1.0';
  //     let signingString = rawURL + encodeURIComponent(parameterString);
  //     let signingKey = encodeURIComponent(this.ConsumerSecret) + '&'; // No TokenSecret because its Request_Token.
  //     let signatur: string = this.CryptoJS.HmacSHA1(signingString, signingKey).toString(this.CryptoJS.enc.Base64);
  //     console.log('Signatur: ' + signatur);

  //     return signatur;
  // }

  twitterLogin(): Observable<any> {
    return this.http.post(
      `${this.composerUrl}/twitter/login`,
      {},
      {
        observe: 'response'
      }
    );
  }

  linkedinToken(code: string): Observable<any> {
    return this.http.get(`${this.composerUrl}/linkedin/token/${code}`);
  }

  twitterUserToken(verifier: string, requestToken): Observable<any> {
    return this.http.post(`${this.composerUrl}/twitter/token/${verifier}`, requestToken, {
      observe: 'response'
    });
  }
}
