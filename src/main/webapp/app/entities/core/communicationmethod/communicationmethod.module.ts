import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  CommunicationmethodComponent,
  CommunicationmethodDetailComponent,
  CommunicationmethodUpdateComponent,
  CommunicationmethodDeletePopupComponent,
  CommunicationmethodDeleteDialogComponent,
  communicationmethodRoute,
  communicationmethodPopupRoute
} from './';

const ENTITY_STATES = [...communicationmethodRoute, ...communicationmethodPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CommunicationmethodComponent,
    CommunicationmethodDetailComponent,
    CommunicationmethodUpdateComponent,
    CommunicationmethodDeleteDialogComponent,
    CommunicationmethodDeletePopupComponent
  ],
  entryComponents: [
    CommunicationmethodComponent,
    CommunicationmethodUpdateComponent,
    CommunicationmethodDeleteDialogComponent,
    CommunicationmethodDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreCommunicationmethodModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
