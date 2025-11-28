import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home';
import { routes } from './app/app.routes';

bootstrapApplication(HomeComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
