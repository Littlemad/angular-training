import { Component, ViewEncapsulation } from '@angular/core';
import { SHARED_IMPORTS } from '../../component/_shared/shared-imports';

@Component({
  selector: 'section[pageDesignSystem]',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './design-system.page.html',
  styleUrl: './design-system.page.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PageDesignSystemComponent {}

