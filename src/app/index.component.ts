import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutHome } from './layout/home/home.component';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { FootComponent } from './layout/foot/foot.component';
import { CssVariablesService } from './services/css-variables.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutHome, MainNavComponent, FootComponent],
  templateUrl: './index.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent {}
