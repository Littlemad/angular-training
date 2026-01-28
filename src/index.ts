import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { HomeComponent } from './app/home';
import { routes } from './app/app.routes';

bootstrapApplication(HomeComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    }))
  ]
}).catch((err) => console.error(err));
