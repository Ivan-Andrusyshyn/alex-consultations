import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TitleCardComponent } from '../../components/title-card/title-card.component';
import { SeoService } from '../../shared/services/seo.service';
import { RouteTrackerService } from '../../shared/services/route-tracker.service';

@Component({
  selector: 'app-toxical-relationship',
  standalone: true,
  imports: [RouterOutlet, TitleCardComponent],
  templateUrl: './toxical-relationship.component.html',
  styleUrl: './toxical-relationship.component.scss',
})
export class ToxicalRelationshipComponent {
  imgUrl = 'assets/svg/tests/worry-woman.svg';
  subtitleText = 'Дізнайтеся, чи є у ваших стосунках тривожні сигнали.';
  titleText = 'Чи токсичні ваші стосунки?';

  private seoService = inject(SeoService);

  private routeTracker = inject(RouteTrackerService);

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle(
      'Тест на токсичні відносини з партнером | Визнач свої стосунки'
    );
    this.seoService.updateMetaTags(
      "Пройди тест на токсичні відносини з партнером, щоб оцінити рівень здоров'я твоїх стосунків та зрозуміти, чи не маєш справу з маніпуляціями чи аб’юзом.",
      'тест, токсичні відносини, партнер, стосунки, маніпуляції, аб’юз, психологія, самопізнання'
    );
  }
}
