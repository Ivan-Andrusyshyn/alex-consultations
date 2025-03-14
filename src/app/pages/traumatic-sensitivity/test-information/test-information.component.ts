import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';
import { SeoService } from '../../../shared/services/seo.service';
import { RouteTrackerService } from '../../../shared/services/route-tracker.service';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TestCardStartBtnComponent],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInformationComponent {
  routeUrl = '/tests/traumatic-sensitivity/questions';
  private seoService = inject(SeoService);

  private routeTracker = inject(RouteTrackerService);

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle(
      'Інформація про тест на травматичну чутливість'
    );
    this.seoService.updateMetaTags(
      'Дізнайся, як працює тест на травматичну чутливість, і що означають його результати. Розкрий свій рівень емоційної вразливості та зрозумій, як він впливає на твоє життя.',
      'інформація про тест, травматична чутливість, психологічний тест, емоційна вразливість, самопізнання, психіка'
    );
  }
}
