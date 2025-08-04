import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouterLink,
} from '@angular/router';
import { filter } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss',
})
export class BreadCrumbComponent {
  breadcrumbs = signal<Breadcrumb[]>([]);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs.set(this.buildBreadcrumbs(this.route.root));
      });
  }
  private trimAfterFirstSlash(path: string): string {
    const match = path.match(/^(.*?\/[^\/]+)(?:\/|$)/);
    return match ? match[1] : path;
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const staticLabel = child.snapshot.data['breadcrumb'];
      const resolved = child.snapshot.data['data'];
      const dynamicLabel = resolved?.breadcrumb;

      const label = staticLabel === 'dynamic' ? dynamicLabel : staticLabel;

      if (label === 'hidden') {
        return []; // Skip this breadcrumb
      }
      if (label) {
        breadcrumbs.push({ label, url: this.trimAfterFirstSlash(url) });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
