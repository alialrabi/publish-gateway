import { Route } from '@angular/router';

import { PublishComponent} from './';

export const PUBLISH_ROUTE: Route = {
  path: 'grapes',
  component: PublishComponent,
  data: {
    authorities: [],
    pageTitle: 'home.title'
  }
};
