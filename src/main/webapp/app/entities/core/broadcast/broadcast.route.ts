import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Broadcast } from 'app/shared/model/core/broadcast.model';
import { BroadcastService } from './broadcast.service';
import { BroadcastComponent } from './broadcast.component';
import { BroadcastDetailComponent } from './broadcast-detail.component';
import { BroadcastUpdateComponent } from './broadcast-update.component';
import { BroadcastDeletePopupComponent } from './broadcast-delete-dialog.component';
import { IBroadcast } from 'app/shared/model/core/broadcast.model';

@Injectable({ providedIn: 'root' })
export class BroadcastResolve implements Resolve<IBroadcast> {
  constructor(private service: BroadcastService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBroadcast> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Broadcast>) => response.ok),
        map((broadcast: HttpResponse<Broadcast>) => broadcast.body)
      );
    }
    return of(new Broadcast());
  }
}

export const broadcastRoute: Routes = [
  {
    path: '',
    component: BroadcastComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.coreBroadcast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BroadcastDetailComponent,
    resolve: {
      broadcast: BroadcastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreBroadcast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BroadcastUpdateComponent,
    resolve: {
      broadcast: BroadcastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreBroadcast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BroadcastUpdateComponent,
    resolve: {
      broadcast: BroadcastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreBroadcast.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const broadcastPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BroadcastDeletePopupComponent,
    resolve: {
      broadcast: BroadcastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreBroadcast.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
