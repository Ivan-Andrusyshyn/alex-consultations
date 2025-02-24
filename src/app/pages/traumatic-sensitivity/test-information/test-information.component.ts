import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TestCardStartBtnComponent, TitleCardComponent],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInformationComponent {
  imgUrl = 'assets/imgs/women-doubs.jpg';
  subtitleText =
    'Цей тест допоможе зрозуміти, як реагуєш на критику, емоції та думку інших.';
  titleText = 'Чутливість: твоя суперсила чи виклик?';
  routeUrl = '/tests/traumatic-sensitivity/questions';
}
