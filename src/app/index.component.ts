import { Component } from '@angular/core';
import { LayoutHome } from './layout/home.component';
import { MainNavComponent } from './component/main-nav/main-nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutHome, MainNavComponent],
  templateUrl: './index.component.html',
})
export class IndexComponent {}
