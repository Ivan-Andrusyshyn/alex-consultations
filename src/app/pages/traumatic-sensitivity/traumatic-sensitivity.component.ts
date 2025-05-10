import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SeoService } from '../../core/services/seo.service';
import { RouteTrackerService } from '../../core/services/route-tracker.service';

@Component({
  selector: 'app-traumatic-sensitivity',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './traumatic-sensitivity.component.html',
  styleUrl: './traumatic-sensitivity.component.scss',
})
export class TraumaticSensitivityComponent implements OnInit {
  imgUrl = 'assets/imgs/women-doubs.jpg';
  subtitleText =
    'Цей тест допоможе зрозуміти, як реагуєш на критику, емоції та думку інших.';
  titleText = 'Чутливість: твоя суперсила чи виклик?';

  private seoService = inject(SeoService);
  private routeTracker = inject(RouteTrackerService);
  constructor() {
    this.routeTracker.getRoutes();
  }

  ngOnInit(): void {
    this.seoService.updateTitle(
      'Тест на травматичну чутливість | Дізнайся про свої почуття'
    );
    this.seoService.updateMetaTags(
      'Пройди тест на травматичну чутливість, щоб краще зрозуміти свої реакції на стресові ситуації та рівень емоційної вразливості.',
      'тест, травматична чутливість, психологія, емоційна вразливість, самопізнання, психіка'
    );
  }
}
