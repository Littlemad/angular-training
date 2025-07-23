import { bootstrapApplication } from '@angular/platform-browser';
import { IndexComponent } from './app/index.component';

bootstrapApplication(IndexComponent)
  .catch((err) => console.error(err));
