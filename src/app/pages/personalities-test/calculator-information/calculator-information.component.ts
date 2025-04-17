import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';

import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';
import { PersonalitiesCalculatorService } from '../../../shared/services/personalities-calculator.service';
import { SeoService } from '../../../shared/services/seo.service';
import { CalculatorInformation } from '../../../shared/types/personalities-calculator';

@Component({
  selector: 'app-calculator-information',
  standalone: true,
  imports: [
    TitleCardComponent,
    TestCardStartBtnComponent,
    AsyncPipe,
    NgIf,
    NgFor,
  ],
  templateUrl: './calculator-information.component.html',
  styleUrl: './calculator-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorInformationComponent implements OnInit {
  imgUrl = 'assets/svg/tests/crossfit.svg';
  subtitleText = 'Дізнайтеся рівень гармонії ваших стосунків.';

  // -----------
  routeUrl = '/tests/16-personalities/calculator';

  titleText = 'Калькулятор сумісності';
  private personalitiesCalculatorService = inject(
    PersonalitiesCalculatorService
  );
  private seoService = inject(SeoService);

  calculatorInformation$!: Observable<CalculatorInformation>;

  ngOnInit(): void {
    this.seoService.updateTitle(
      'Калькулятор сумісності: дізнайтеся рівень гармонії ваших стосунків'
    );

    this.seoService.updateMetaTags(
      'Перевірте свою сумісність у стосунках за системою 16 особистостей (MBTI). Дізнайтеся, як ваші типи впливають на взаєморозуміння та гармонію.',
      'калькулятор сумісності, тест на сумісність, MBTI пари, 16 особистостей, психологія відносин, аналіз сумісності, як покращити стосунки, сумісність у парі, типи особистості у стосунках'
    );

    this.calculatorInformation$ = this.personalitiesCalculatorService
      .getPersonalitiesCalculatorInformation()
      .pipe(map((r) => r.calculatorInformation));
  }
}
