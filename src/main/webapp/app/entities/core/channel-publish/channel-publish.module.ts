import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ChannelPublishComponent,
  ChannelPublishDetailComponent,
  ChannelPublishUpdateComponent,
  ChannelPublishDeletePopupComponent,
  ChannelPublishDeleteDialogComponent,
  channelRoute,
  channelPopupRoute
} from './';

const ENTITY_STATES = [...channelRoute, ...channelPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ChannelPublishComponent,
    ChannelPublishDetailComponent,
    ChannelPublishUpdateComponent,
    ChannelPublishDeleteDialogComponent,
    ChannelPublishDeletePopupComponent
  ],
  entryComponents: [
    ChannelPublishComponent,
    ChannelPublishUpdateComponent,
    ChannelPublishDeleteDialogComponent,
    ChannelPublishDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreChannelPublishModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
