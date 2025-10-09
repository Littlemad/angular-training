import { Component, OnInit } from '@angular/core';
import { CssVariablesService } from '../../services/css-variables.service';

@Component({
  selector: 'app-css-debug',
  standalone: true,
  template: `
    <div class="css-debug-container">
      <h3>Generated CSS Variables</h3>
      <button (click)="toggleShowCss()" class="toggle-btn">
        {{ showCss ? 'Hide' : 'Show' }} Generated CSS
      </button>
      
      @if (showCss) {
        <pre class="generated-css">{{ generatedCss }}</pre>
      }
      
      <div class="usage-example">
        <h4>Usage Example:</h4>
        <p>You can now use these CSS variables in your styles:</p>
        <pre class="code-example">{{ usageExample }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .css-debug-container {
      padding: 20px;
      background: var(--grey-l3);
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .toggle-btn {
      background: var(--primary);
      color: var(--white);
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 15px;
    }
    
    .toggle-btn:hover {
      background: var(--primary-d1);
    }
    
    .generated-css {
      background: var(--black);
      color: var(--white);
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      font-family: monospace;
      font-size: 12px;
      line-height: 1.4;
    }
    
    .usage-example {
      margin-top: 20px;
    }
    
    .code-example {
      background: var(--grey-l2);
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      font-family: monospace;
      font-size: 12px;
      line-height: 1.4;
      border-left: 4px solid var(--primary);
    }
  `]
})
export class CssDebugComponent implements OnInit {
  showCss = false;
  generatedCss = '';
  usageExample = `.my-element {
  background-color: var(--primary);
  color: var(--white);
  border: 1px solid var(--grey);
}

.my-link {
  color: var(--link);
}

.my-link:hover {
  color: var(--link-hover);
}`;

  constructor(private cssVariablesService: CssVariablesService) {}

  ngOnInit(): void {
    this.generateCssPreview();
  }

  toggleShowCss(): void {
    this.showCss = !this.showCss;
  }

  private generateCssPreview(): void {
    const data = this.cssVariablesService.getData();
    let css = ':root {\n';
    
    // Generate CSS variables for colors
    data.colors.forEach(color => {
      css += `  --${color.var}: ${color.value};\n`;
    });
    
    // Generate CSS variables for links
    data.links.forEach(link => {
      css += `  --${link.var}: ${link.value};\n`;
      if (link.themeDark) {
        css += `  --${link.var}-dark: ${link.themeDark};\n`;
      }
    });
    
    css += '}\n';
    
    // Add dark theme variables if needed
    const hasDarkTheme = data.links.some(link => link.themeDark);
    if (hasDarkTheme) {
      css += '\n@media (prefers-color-scheme: dark) {\n';
      css += '  :root {\n';
      data.links.forEach(link => {
        if (link.themeDark) {
          css += `    --${link.var}: ${link.themeDark};\n`;
        }
      });
      css += '  }\n';
      css += '}\n';
    }
    
    this.generatedCss = css;
  }
}
