import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain.component';
import { DomainService } from './domain.service';
import { GatewaySharedModule } from 'app/shared';
import { JhiAlertService } from 'ng-jhipster';
import { NewDomainComponent } from './new-domain/new-domain.component';

@NgModule({
  declarations: [DomainComponent, NewDomainComponent],
  imports: [CommonModule, DomainRoutingModule, GatewaySharedModule],
  providers: [DomainService, JhiAlertService]
})
export class DomainModule {}
