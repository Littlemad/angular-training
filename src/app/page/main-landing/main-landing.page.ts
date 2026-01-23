import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'section[pageMainLanding]',
  standalone: true,
  templateUrl: './main-landing.page.html',
  styleUrl: './main-landing.page.scss',
  host: {
    class: 'main-landing main-content',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PageMainLandingComponent {}

