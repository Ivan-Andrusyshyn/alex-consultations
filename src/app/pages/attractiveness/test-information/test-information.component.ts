import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { RouteTrackerService } from '../../../core/services/route-tracker.service';
import { SeoService } from '../../../core/services/seo.service';
import { TestCardStartBtnComponent } from '../../../shared/components/test/test-card-start-btn/test-card-start-btn.component';
import testInfo from './test-info';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TestCardStartBtnComponent, NgFor],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
})
export class TestInformationComponent {
  private seoService = inject(SeoService);
  testInformation = testInfo;
  private routeTracker = inject(RouteTrackerService);

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle(
      'Інформація про тест на привабливість | Деталі та результати'
    );
    this.seoService.updateMetaTags(
      'Дізнайся, як працює тест на привабливість і що означають його результати. Розкрий свої унікальні якості, які роблять тебе привабливим та харизматичним.',
      'інформація про тест, тест на привабливість, природна харизма, особистісні якості, впевненість у собі, психологія привабливості, самопізнання, внутрішня сила'
    );
  }
}
