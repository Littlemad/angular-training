import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-experiments',
  standalone: true,
  template: `
    <div class="page-content">
      <h1>Angular Experiments</h1>
      <p>Welcome to the Angular Experiments page.</p>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 2rem;
    }
    h1 {
      color: #333;
      margin-bottom: 1rem;
    }
  `]
})
export class AngularExperimentsComponent {}
