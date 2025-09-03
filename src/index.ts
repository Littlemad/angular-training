import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { IndexComponent } from './app';
import { routes } from './app/app.routes';

bootstrapApplication(IndexComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
