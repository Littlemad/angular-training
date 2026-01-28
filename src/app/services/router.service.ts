import { DOCUMENT, Location } from '@angular/common';
import { DestroyRef, Inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  IsActiveMatchOptions,
  NavigationEnd,
  Params,
  Router,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private readonly currentRouteSubject = new BehaviorSubject<string>('');
  readonly currentRoute$ = this.currentRouteSubject.asObservable();

  private readonly isDesignSystemSubject = new BehaviorSubject<boolean>(false);
  readonly isDesignSystem$ = this.isDesignSystemSubject.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private destroyRef: DestroyRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.initializeRouteTracking();
    this.initializeAnchorScrolling();
  }

  private initializeRouteTracking(): void {
    this.updateFromUrl(this.router.url);

    // Listen to route changes
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((event) => event.urlAfterRedirects),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((url) => this.updateFromUrl(url));
  }

  private updateFromUrl(url: string): void {
    this.currentRouteSubject.next(url);
    this.isDesignSystemSubject.next(url.includes('/design-system'));
  }

  navigateTo(route: string | string[], queryParams?: Params): Promise<boolean> {
    return this.router.navigate(Array.isArray(route) ? route : [route], {
      queryParams
    });
  }

  navigateToDesignSystem(): Promise<boolean> {
    return this.navigateTo('/design-system');
  }

  navigateToTabletopCounter(): Promise<boolean> {
    return this.navigateTo('/tabletop-counter');
  }

  navigateToAngularExperiments(): Promise<boolean> {
    return this.navigateTo('/angular-experiments');
  }

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
  }

  getCurrentRoute(): string {
    return this.currentRouteSubject.value;
  }

  isOnDesignSystemRoute(): boolean {
    return this.isDesignSystemSubject.value;
  }

  getRouteParams(): Observable<Params> {
    return this.activatedRoute.params;
  }

  getQueryParams(): Observable<Params> {
    return this.activatedRoute.queryParams;
  }

  isRouteActive(route: string | UrlTree): boolean {
    // equivalent to the deprecated `isActive(url, false)`
    const matchOptions: IsActiveMatchOptions = {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    };
    return this.router.isActive(route, matchOptions);
  }

  getRouteData(): Observable<Record<string, unknown>> {
    return this.activatedRoute.data as Observable<Record<string, unknown>>;
  }

  private initializeAnchorScrolling(): void {
    fromEvent<MouseEvent>(this.document, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handleAnchorClick(event));
  }

  private handleAnchorClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');

    if (!anchor) return;

    const href = anchor.getAttribute('href');

    if (href?.startsWith('#')) {
      event.preventDefault();
      const fragment = href.substring(1);
      this.router.navigate([], { fragment, replaceUrl: true });
    }
  }
}
