import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../shared/services/seo.service';
import { RouteTrackerService } from '../../shared/services/route-tracker.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private seoService = inject(SeoService);
  private routeTracker = inject(RouteTrackerService);
  constructor() {
    this.routeTracker.getRoutes();
  }

  ngOnInit(): void {
    this.seoService.updateTitle(
      'Про нас | Дізнайся більше про нашу команду та місію'
    );
    this.seoService.updateMetaTags(
      'Я створю тести для самопізнання та розвитку особистості. Дізнайся мою більше місію та цілі.',
      'ментор, вчитель, місія, самопізнання, розвиток особистості, тести, психологія, саморозвиток'
    );
  }
}
