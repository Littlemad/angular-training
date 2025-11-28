import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: '.layout-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  encapsulation: ViewEncapsulation.None
})
export class LayoutHome implements OnInit, OnDestroy {
  isPage = "design-system";
  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updatePageBasedOnRoute(event.url);
      });
    
    // Set initial page based on current route
    this.updatePageBasedOnRoute(this.router.url);
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  private updatePageBasedOnRoute(url: string) {
    if (url.includes('/design-system')) {
      this.isPage = "designSystem";
    } else if (url.includes('/angular-experiments')) {
      this.isPage = "angularExperiments";
    } else if (url.includes('/tabletop-counter')) {
      this.isPage = "tabletopCounter";
    }
  }
}