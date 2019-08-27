import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'channel-publish',
        loadChildren: () => import('./core/channel-publish/channel-publish.module').then(m => m.CoreChannelPublishModule)
      },
      {
        path: 'broadcast',
        loadChildren: () => import('./core/broadcast/broadcast.module').then(m => m.CoreBroadcastModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
