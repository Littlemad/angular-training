import { Routes } from '@angular/router';
import { PageMainLandingComponent } from './pages/main-landing/main-landing';
import { PageDesignSystemComponent } from './pages/design-system/design-system.component';
import { PageTabletopCounterComponent } from './pages/tabletop-counter/tabletop-counter';
import { PageAngularExperimentsComponent } from './pages/angular-experiments/angular-experiments';

export const routes: Routes = [
  { path: '', redirectTo: '/main-landing', pathMatch: 'full' },
  { path: 'main-landing', component: PageMainLandingComponent },
  { path: 'design-system', component: PageDesignSystemComponent },
  { path: 'tabletop-counter', component: PageTabletopCounterComponent },
  { path: 'angular-experiments', component: PageAngularExperimentsComponent },
  { path: '**', redirectTo: '/main-landing' }, // Wildcard route for 404s
];
