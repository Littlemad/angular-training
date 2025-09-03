import { Component } from '@angular/core';

@Component({
  selector: 'app-design-system',
  standalone: true,
  template: `
    <div class="page-content">
      <h1>Design System</h1>
      <p>Welcome to the Design System page.</p>
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
export class DesignSystemComponent {}
