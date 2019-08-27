import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ChannelPublish } from 'app/shared/model/core/channel-publish.model';
import { ChannelPublishService } from './channel-publish.service';
import { ChannelPublishComponent } from './channel-publish.component';
import { ChannelPublishDetailComponent } from './channel-publish-detail.component';
import { ChannelPublishUpdateComponent } from './channel-publish-update.component';
import { ChannelPublishDeletePopupComponent } from './channel-publish-delete-dialog.component';
import { IChannelPublish } from 'app/shared/model/core/channel-publish.model';

@Injectable({ providedIn: 'root' })
export class ChannelPublishResolve implements Resolve<IChannelPublish> {
  constructor(private service: ChannelPublishService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IChannelPublish> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ChannelPublish>) => response.ok),
        map((channel: HttpResponse<ChannelPublish>) => channel.body)
      );
    }
    return of(new ChannelPublish());
  }
}

export const channelRoute: Routes = [
  {
    path: '',
    component: ChannelPublishComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.coreChannel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChannelPublishDetailComponent,
    resolve: {
      channel: ChannelPublishResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreChannel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChannelPublishUpdateComponent,
    resolve: {
      channel: ChannelPublishResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreChannel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChannelPublishUpdateComponent,
    resolve: {
      channel: ChannelPublishResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreChannel.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const channelPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ChannelPublishDeletePopupComponent,
    resolve: {
      channel: ChannelPublishResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.coreChannel.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
