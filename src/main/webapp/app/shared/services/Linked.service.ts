import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { JhiDateUtils } from 'ng-jhipster';

@Injectable()
export class LinkedInService {
  private resourceUrl = SERVER_API_URL + 'core/api/tagcategories';
  registerImageBody = {
    registerUploadRequest: {
      recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
      owner: 'urn:li:person:DQnMuWS0r0',
      serviceRelationships: [
        {
          relationshipType: 'OWNER',
          identifier: 'urn:li:userGeneratedContent'
        }
      ]
    }
  };

  constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

  registerImage(token) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
      Authorization: 'Bearer ' + token
    });
    const options = { headers };
    return this.http.post('https://api.linkedin.com/v2/assets?action=registerUpload', this.registerImageBody, options);
  }

  getUserDetails(token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    const options = { headers };
    return this.http.get('https://api.linkedin.com/v2/me', options);
  }
  // create(tagcategory: Tagcategory): Observable<EntityResponseType> {
  //     return this.http
  //         .post<Tagcategory>(this.resourceUrl, copy, { observe: 'response' });
  // }

  // getAllTagCategory(): Observable<any> {
  //     return this.http.get(`${this.tagCategoryUrl}`);
  // }
}
