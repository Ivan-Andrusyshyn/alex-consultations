import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteTrackerService {
  private routeMap: string[] = [];

  constructor(private router: Router) {
    this.loadRoutes();
    this.trackRoutes();
  }

  private trackRoutes() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.routeMap.push(event.urlAfterRedirects);
        sessionStorage.setItem('routeMap', JSON.stringify(this.routeMap));
      });
  }

  private loadRoutes() {
    const savedRoutes = sessionStorage.getItem('routeMap');
    if (savedRoutes) {
      this.routeMap = JSON.parse(savedRoutes);
    }
  }
  clearRouteMap() {
    this.routeMap = [];
    sessionStorage.removeItem('routeMap');
  }
  getRoutes(): string {
    return this.routeMap.length ? this.routeMap.join(' > ') : '';
  }
}
