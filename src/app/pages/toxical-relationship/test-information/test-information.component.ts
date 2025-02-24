import { Component } from '@angular/core';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { RouterLink } from '@angular/router';
import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TitleCardComponent, RouterLink, TestCardStartBtnComponent],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
})
export class TestInformationComponent {
  imgUrl = 'assets/svg/tests/worry-woman.svg';
  subtitleText = 'Дізнайтеся, чи є у ваших стосунках тривожні сигнали.';
  titleText = 'Чи токсичні ваші стосунки?';
  routeUrl = '/tests/toxical-relationship/questions';
}
