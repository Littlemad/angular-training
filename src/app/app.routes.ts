import { Routes } from '@angular/router';
import { DesignSystemComponent } from './pages/design-system/design-system.component';
import { TabletopCounterComponent } from './pages/tabletop-counter/tabletop-counter';
import { AngularExperimentsComponent } from './pages/angular-experiments/angular-experiments';

export const routes: Routes = [
  { path: '', redirectTo: '/design-system', pathMatch: 'full' },
  { path: 'design-system', component: DesignSystemComponent },
  { path: 'tabletop-counter', component: TabletopCounterComponent },
  { path: 'angular-experiments', component: AngularExperimentsComponent },
  { path: '**', redirectTo: '/design-system' }, // Wildcard route for 404s
];
