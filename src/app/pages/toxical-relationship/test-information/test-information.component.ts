import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';
import { SeoService } from '../../../shared/services/seo.service';
import { map, Observable } from 'rxjs';
import { TestInformation } from '../../../shared/types/toxical-relationship';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TestCardStartBtnComponent, NgIf, AsyncPipe, NgFor],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
})
export class TestInformationComponent implements OnInit {
  routeUrl = '/tests/toxical-relationship/questions';

  private seoService = inject(SeoService);
  private activeRoute = inject(ActivatedRoute);

  testInfo$!: Observable<TestInformation>;

  ngOnInit(): void {
    this.activeRoute.params.subscribe((r) => {
      this.testInfo$ = this.activeRoute.data.pipe(
        map((data) => {
          const response = data['toxicalRelationshipData'];
          return response.testInformation;
        })
      );
    });

    this.seoService.updateTitle(
      'Інформація про тест на токсичні відносини з партнером | Деталі та результати'
    );
    this.seoService.updateMetaTags(
      "Дізнайся, як працює тест на токсичні відносини з партнером, і що означають його результати. Зрозумій, як оцінити здоров'я своїх стосунків і чи існує ризик маніпуляцій чи аб’юзу.",
      'інформація про тест, токсичні відносини, партнер, стосунки, маніпуляції, аб’юз, психологія, здорові стосунки'
    );
  }
}
