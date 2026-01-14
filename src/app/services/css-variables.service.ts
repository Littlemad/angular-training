// this service is used to inject the css global variables into the root element from a JSON file

import { Injectable } from '@angular/core';
import data from '../data/data.json';

export interface ColorData {
  value: string;
  var: string;
  name: string;
  themeDark?: string;
}

export interface DataStructure {
  colors: ColorData[];
  links: ColorData[];
}

@Injectable({
  providedIn: 'root'
})
export class CssVariablesService {
  private data: DataStructure = data;

  constructor() {
    this.injectCssVariables();
  }

  private injectCssVariables(): void {
    const styleElement = this.getOrCreateStyleElement();
    const cssVariables = this.generateCssVariables();
    styleElement.textContent = cssVariables;
  }

  private getOrCreateStyleElement(): HTMLStyleElement {
    let styleElement = document.getElementById('dynamic-css-variables') as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dynamic-css-variables';
      styleElement.type = 'text/css';
      document.head.appendChild(styleElement);
    }
    
    return styleElement;
  }

  private generateCssVariables(): string {
    let css = ':root {\n';
    
    // Generate CSS variables for colors (with color- prefix to match SCSS)
    this.data.colors.forEach(color => {
      css += `  --color-${color.var}: ${color.value};\n`;
    });
    
    // Generate CSS variables for links (with color- prefix to match SCSS)
    this.data.links.forEach(link => {
      css += `  --color-${link.var}: ${link.value};\n`;
      if (link.themeDark) {
        css += `  --color-${link.var}-dark: ${link.themeDark};\n`;
      }
    });
    
    css += '}\n';
    
    // Add dark theme variables when html[darktheme] attribute is present
    const hasDarkTheme = this.data.links.some(link => link.themeDark);
    if (hasDarkTheme) {
      css += '\nhtml[darktheme] {\n';
      this.data.links.forEach(link => {
        if (link.themeDark) {
          css += `  --color-${link.var}: ${link.themeDark};\n`;
        }
      });
      css += '}\n';
    }
    
    return css;
  }

  public getData(): DataStructure {
    return this.data;
  }

  public getColors(): ColorData[] {
    return this.data.colors;
  }

  public getLinks(): ColorData[] {
    return this.data.links;
  }

  public refreshCssVariables(): void {
    this.injectCssVariables();
  }
}
