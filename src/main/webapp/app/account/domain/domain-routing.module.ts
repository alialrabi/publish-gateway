import { DomainComponent } from './domain.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'domain', component: DomainComponent, data: { authorities: [], pageTitle: 'domain.title' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule {}
