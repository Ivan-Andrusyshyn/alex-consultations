import { Component, inject, OnInit } from '@angular/core';

import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TestCardStartBtnComponent],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
})
export class TestInformationComponent implements OnInit {
  routeUrl = '/tests/toxical-relationship/questions';

  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateTitle(
      'Інформація про тест на токсичні відносини з партнером | Деталі та результати'
    );
    this.seoService.updateMetaTags(
      "Дізнайся, як працює тест на токсичні відносини з партнером, і що означають його результати. Зрозумій, як оцінити здоров'я своїх стосунків і чи існує ризик маніпуляцій чи аб’юзу.",
      'інформація про тест, токсичні відносини, партнер, стосунки, маніпуляції, аб’юз, психологія, здорові стосунки'
    );
  }
}
