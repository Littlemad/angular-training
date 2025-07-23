import { Component } from '@angular/core';
import { LayoutHome } from './layout/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutHome],
  templateUrl: './index.component.html',
})
export class IndexComponent {} 