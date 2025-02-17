import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [RouterLink, TitleCardComponent],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInformationComponent {
  imgUrl = 'assets/imgs/yoga-love.jpg';
  subtitleText =
    'Цей тест допоможе тобі краще зрозуміти свої природні схильності.';
  titleText = 'Тест 16 типів особистості';
}
