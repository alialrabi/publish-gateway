import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { DataTablesModule } from 'angular-datatables';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { socialchannelRoute } from './social-channel.route';
import { SocialChannelComponent } from './social-channel.component';
import { SocialChannelService } from './social-channel.service';
import { NewSocialChannelComponent } from './newsocial-channel.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';
import { GatewaySharedModule } from 'app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const ENTITY_STATES = [...socialchannelRoute];

@NgModule({
  imports: [
    GatewaySharedModule,
    RouterModule.forChild(ENTITY_STATES),
    // DataTablesModule,
    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [SocialChannelComponent, NewSocialChannelComponent],
  entryComponents: [SocialChannelComponent],
  providers: [SocialChannelService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocialChannelModule {
  // constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
  //     this.languageHelper.language.subscribe((languageKey: string) => {
  //         if (languageKey !== undefined) {
  //             this.languageService.changeLanguage(languageKey);
  //         }
  //     });
  // }
}
