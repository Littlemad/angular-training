import { Routes } from '@angular/router';
import { DesignSystemComponent } from './pages/design-system.component';
import { TabletopCounterComponent } from './pages/tabletop-counter.component';
import { AngularExperimentsComponent } from './pages/angular-experiments.component';

export const routes: Routes = [
  { path: '', redirectTo: '/design-system', pathMatch: 'full' },
  { path: 'design-system', component: DesignSystemComponent },
  { path: 'tabletop-counter', component: TabletopCounterComponent },
  { path: 'angular-experiments', component: AngularExperimentsComponent },
  { path: '**', redirectTo: '/design-system' } // Wildcard route for 404s
];
