import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SocialChannelComponent } from './social-channel.component';
import { NewSocialChannelComponent } from './newsocial-channel.component';
import { UserRouteAccessService } from 'app/core';

export const socialchannelRoute: Routes = [
  {
    path: 'socialchannel',
    component: SocialChannelComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'socialchannel-edit/:id',
    component: NewSocialChannelComponent,
    data: {
      authorities: ['ROLE_ADMIN', 'ROLE_CONTENT_ADMIN', 'ROLE_ACCOUNT_OWNER'],
      title: 'Skywriter'
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'socialchannel-new',
    component: NewSocialChannelComponent,
    data: {
      authorities: ['ROLE_ADMIN', 'ROLE_CONTENT_ADMIN', 'ROLE_ACCOUNT_OWNER'],
      title: 'Skywriter'
    },
    canActivate: [UserRouteAccessService]
  }
];
