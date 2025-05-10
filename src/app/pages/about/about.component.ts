import { Component, inject, OnInit } from '@angular/core';

import { RouteTrackerService } from '../../core/services/route-tracker.service';
import { SeoService } from '../../core/services/seo.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SocialLinksComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private seoService = inject(SeoService);
  private routeTracker = inject(RouteTrackerService);

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle(
      'Про нас | Дізнайся більше про нашу команду та місію'
    );
    this.seoService.updateMetaTags(
      'Я створю тести для самопізнання та розвитку особистості. Дізнайся мою більше місію та цілі.',
      'ментор, вчитель, місія, самопізнання, розвиток особистості, тести, психологія, саморозвиток'
    );
  }
}
