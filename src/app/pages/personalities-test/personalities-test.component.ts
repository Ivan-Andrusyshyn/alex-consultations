import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { TitleCardComponent } from '../../components/title-card/title-card.component';

@Component({
  selector: 'app-personalities-test',
  standalone: true,
  imports: [RouterOutlet, TitleCardComponent],
  templateUrl: './personalities-test.component.html',
  styleUrl: './personalities-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalitiesTestComponent {
  svgName = { url: 'assets/svg/tests/icons-tests.svg#stretching' };
  imgUrl = 'assets/imgs/yoga-love.jpg';
  subtitleText =
    'Цей тест допоможе тобі краще зрозуміти свої природні схильності.';
  titleText = 'Тест 16 типів особистості';
}
