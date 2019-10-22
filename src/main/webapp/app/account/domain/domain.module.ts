import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain.component';
import { DomainService } from './domain.service';

@NgModule({
  declarations: [DomainComponent],
  imports: [CommonModule, DomainRoutingModule],
  providers: [DomainService]
})
export class DomainModule {}
