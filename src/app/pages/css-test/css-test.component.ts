import { Component } from '@angular/core';
import { CssVariablesService } from '../../services/css-variables.service';

@Component({
  selector: 'app-css-test',
  standalone: true,
  template: `
    <div class="css-test-container">
      <h3>CSS Variables Test</h3>
      <div class="color-grid">
        @for (color of colors; track color.var) {
          <div 
            class="color-swatch"
            [style.background-color]="'var(--' + color.var + ')'"
            [title]="color.name + ': ' + color.value"
          >
            <span class="color-name">{{ color.name }}</span>
            <span class="color-var">--{{ color.var }}</span>
          </div>
        }
      </div>
      
      <div class="link-test">
        <h4>Link Variables Test</h4>
        <a href="#" class="test-link">Test Link</a>
        <a href="#" class="test-link-visited">Test Visited Link</a>
        <a href="#" class="test-link-hover">Test Hover Link</a>
        <a href="#" class="test-link-active">Test Active Link</a>
      </div>
    </div>
  `,
  styles: [`
    .css-test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 10px;
      margin: 20px 0;
    }
    
    .color-swatch {
      height: 80px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: 1px solid var(--grey);
      color: var(--black);
      font-size: 12px;
    }
    
    .color-name {
      font-weight: bold;
      margin-bottom: 4px;
    }
    
    .color-var {
      font-family: monospace;
      background: rgba(255, 255, 255, 0.8);
      padding: 2px 4px;
      border-radius: 3px;
    }
    
    .link-test {
      margin-top: 30px;
    }
    
    .link-test h4 {
      margin-bottom: 15px;
    }
    
    .test-link {
      color: var(--link);
      text-decoration: none;
      margin-right: 20px;
    }
    
    .test-link-visited {
      color: var(--link-visited);
      text-decoration: none;
      margin-right: 20px;
    }
    
    .test-link-hover:hover {
      color: var(--link-hover);
      text-decoration: none;
      margin-right: 20px;
    }
    
    .test-link-active:active {
      color: var(--link-active);
      text-decoration: none;
      margin-right: 20px;
    }
  `]
})
export class CssTestComponent {
  
  colors: any[] = [];

  constructor(private cssVariablesService: CssVariablesService) {
    this.colors = this.cssVariablesService.getColors();
  }
  
}
