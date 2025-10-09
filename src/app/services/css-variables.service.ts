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
    
    // Generate CSS variables for colors
    this.data.colors.forEach(color => {
      css += `  --${color.var}: ${color.value};\n`;
    });
    
    // Generate CSS variables for links
    this.data.links.forEach(link => {
      css += `  --${link.var}: ${link.value};\n`;
      if (link.themeDark) {
        css += `  --${link.var}-dark: ${link.themeDark};\n`;
      }
    });
    
    css += '}\n';
    
    // Add dark theme variables if needed
    const hasDarkTheme = this.data.links.some(link => link.themeDark);
    if (hasDarkTheme) {
      css += '\n@media (prefers-color-scheme: dark) {\n';
      css += '  :root {\n';
      this.data.links.forEach(link => {
        if (link.themeDark) {
          css += `    --${link.var}: ${link.themeDark};\n`;
        }
      });
      css += '  }\n';
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
