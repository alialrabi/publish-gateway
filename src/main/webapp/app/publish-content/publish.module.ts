import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContentSharedModule } from 'app/shared';
import {PUBLISH_ROUTE} from "app/publish-content/publish.route";
import {PublishComponent} from "app/publish-content/publish.component";

@NgModule({
  imports: [ContentSharedModule, RouterModule.forChild([PUBLISH_ROUTE])],
  declarations: [PublishComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublishModule {}
