import {Routes} from '@angular/router';

import {
  RioCounterPage,
  RioAboutPage,
  RioPersonalizedPage
} from '../pages';

export const SAMPLE_APP_ROUTES: Routes = [{
  pathMatch: 'full',
  path: '',
  redirectTo: 'counter'
}, {
  path: 'counter',
  component: RioCounterPage
}, {
  path: 'personalized',
  component: RioPersonalizedPage
}, {
  path: 'about',
  component: RioAboutPage
}];
