import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Communicationmethod } from 'app/shared/model/core/communicationmethod.model';
import { CommunicationmethodService } from './communicationmethod.service';
import { CommunicationmethodComponent } from './communicationmethod.component';
import { CommunicationmethodDetailComponent } from './communicationmethod-detail.component';
import { CommunicationmethodUpdateComponent } from './communicationmethod-update.component';
import { CommunicationmethodDeletePopupComponent } from './communicationmethod-delete-dialog.component';
import { ICommunicationmethod } from 'app/shared/model/core/communicationmethod.model';

@Injectable({ providedIn: 'root' })
export class CommunicationmethodResolve implements Resolve<ICommunicationmethod> {
  constructor(private service: CommunicationmethodService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICommunicationmethod> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Communicationmethod>) => response.ok),
        map((communicationmethod: HttpResponse<Communicationmethod>) => communicationmethod.body)
      );
    }
    return of(new Communicationmethod());
  }
}

export const communicationmethodRoute: Routes = [
  {
    path: '',
    component: CommunicationmethodComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.coreCommunicationmethod.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CommunicationmethodDetailComponent,
    resolve: {
      communicationmethod: CommunicationmethodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreCommunicationmethod.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CommunicationmethodUpdateComponent,
    resolve: {
      communicationmethod: CommunicationmethodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreCommunicationmethod.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CommunicationmethodUpdateComponent,
    resolve: {
      communicationmethod: CommunicationmethodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreCommunicationmethod.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const communicationmethodPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CommunicationmethodDeletePopupComponent,
    resolve: {
      communicationmethod: CommunicationmethodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreCommunicationmethod.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
