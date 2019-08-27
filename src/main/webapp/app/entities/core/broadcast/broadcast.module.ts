import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  BroadcastComponent,
  BroadcastDetailComponent,
  BroadcastUpdateComponent,
  BroadcastDeletePopupComponent,
  BroadcastDeleteDialogComponent,
  broadcastRoute,
  broadcastPopupRoute
} from './';

const ENTITY_STATES = [...broadcastRoute, ...broadcastPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BroadcastComponent,
    BroadcastDetailComponent,
    BroadcastUpdateComponent,
    BroadcastDeleteDialogComponent,
    BroadcastDeletePopupComponent
  ],
  entryComponents: [BroadcastComponent, BroadcastUpdateComponent, BroadcastDeleteDialogComponent, BroadcastDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreBroadcastModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
