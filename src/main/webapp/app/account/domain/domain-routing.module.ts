import { DomainComponent } from './domain.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { NewDomainComponent } from './new-domain/new-domain.component';

const routes: Routes = [
  {
    path: 'domain',
    component: DomainComponent,
    data: {
      authorities: ['ROLE_USER', 'ROLE_ADMIN'],
      pageTitle: 'domain.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new-domain',
    component: NewDomainComponent,
    data: {
      authorities: ['ROLE_USER', 'ROLE_ADMIN'],
      pageTitle: 'domain.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule {}
