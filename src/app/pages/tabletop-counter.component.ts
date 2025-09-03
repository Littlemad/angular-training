import { Component } from '@angular/core';

@Component({
  selector: 'app-tabletop-counter',
  standalone: true,
  template: `
    <div class="page-content">
      <h1>Tabletop Counter</h1>
      <p>Welcome to the Tabletop Counter page.</p>
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
export class TabletopCounterComponent {}
