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
import { CalculatorInformation } from '../../../shared/types/16-personalities';
import { PersonalitiesCalculatorService } from '../../../shared/services/personalities-calculator.service';

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
  routeUrl = '/tests/16-personalities/calculator-relationships';

  titleText = 'Калькулятор сумісності';
  private personalitiesCalculatorService = inject(
    PersonalitiesCalculatorService
  );

  calculatorInformation$!: Observable<CalculatorInformation>;

  ngOnInit(): void {
    this.calculatorInformation$ = this.personalitiesCalculatorService
      .getPersonalitiesCalculatorInformation()
      .pipe(map((r) => r.calculatorInformation));
  }
}
