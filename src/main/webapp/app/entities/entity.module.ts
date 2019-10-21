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
      },
      {
        path: 'contact',
        loadChildren: () => import('./core/contact/contact.module').then(m => m.CoreContactModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./core/address/address.module').then(m => m.CoreAddressModule)
      },
      {
        path: 'communicationmethod',
        loadChildren: () => import('./core/communicationmethod/communicationmethod.module').then(m => m.CoreCommunicationmethodModule)
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
