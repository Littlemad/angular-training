import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutHome } from './layout/home.component';
import { MainNavComponent } from './component/main-nav/main-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutHome, MainNavComponent],
  templateUrl: './index.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent {}
