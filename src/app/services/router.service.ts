import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private currentRouteSubject = new BehaviorSubject<string>('');
  public currentRoute$ = this.currentRouteSubject.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeRouteTracking();
  }

  /**
   * Initialize route tracking and state management
   */
  private initializeRouteTracking(): void {
    // Listen to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url)
      )
      .subscribe(url => {
        this.currentRouteSubject.next(url);
        this.isDesignSystemSubject.next(url.includes('/design-system'));
      });

    // Set initial values
    const currentUrl = this.router.url;
    this.currentRouteSubject.next(currentUrl);
    this.isDesignSystemSubject.next(currentUrl.includes('/design-system'));
  }

  /**
   * Navigate to a specific route
   */
  navigateTo(route: string | string[], queryParams?: any): Promise<boolean> {
    return this.router.navigate(Array.isArray(route) ? route : [route], {
      queryParams
    });
  }

  /**
   * Navigate to design system page
   */
  navigateToDesignSystem(): Promise<boolean> {
    return this.navigateTo('/design-system');
  }

  /**
   * Navigate to tabletop counter page
   */
  navigateToTabletopCounter(): Promise<boolean> {
    return this.navigateTo('/tabletop-counter');
  }

  /**
   * Navigate to angular experiments page
   */
  navigateToAngularExperiments(): Promise<boolean> {
    return this.navigateTo('/angular-experiments');
  }

  /**
   * Navigate back in browser history
   */
  goBack(): void {
    window.history.back();
  }

  /**
   * Navigate forward in browser history
   */
  goForward(): void {
    window.history.forward();
  }

  /**
   * Get current route as string
   */
  getCurrentRoute(): string {
    return this.currentRouteSubject.value;
  }

  /**
   * Check if currently on design system route
   */
  isOnDesignSystemRoute(): boolean {
    return this.isDesignSystemSubject.value;
  }

  /**
   * Get route parameters as observable
   */
  getRouteParams(): Observable<any> {
    return this.activatedRoute.params;
  }

  /**
   * Get query parameters as observable
   */
  getQueryParams(): Observable<any> {
    return this.activatedRoute.queryParams;
  }

  /**
   * Check if a specific route is active
   */
  isRouteActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

  /**
   * Get route data
   */
  getRouteData(): Observable<any> {
    return this.activatedRoute.data;
  }
}
