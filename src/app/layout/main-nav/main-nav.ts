import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: '#main-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-nav.html',
  styleUrls: ['./main-nav.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainNavComponent {

}
