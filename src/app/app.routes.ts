import { Routes } from '@angular/router';
import { PageMainLandingComponent } from './page/main-landing/main-landing.page';
import { PageDesignSystemComponent } from './page/design-system/design-system.page';
import { PageTabletopCounterComponent } from './page/tabletop-counter/tabletop-counter.page';
import { PageAngularExperimentsComponent } from './page/angular-experiments/angular-experiments.page';

export const routes: Routes = [
  { path: '', redirectTo: '/main-landing', pathMatch: 'full' },
  { path: 'main-landing', component: PageMainLandingComponent },
  { path: 'design-system', component: PageDesignSystemComponent },
  { path: 'tabletop-counter', component: PageTabletopCounterComponent },
  { path: 'angular-experiments', component: PageAngularExperimentsComponent },
  { path: '**', redirectTo: '/main-landing' }, // Wildcard route for 404s
];
