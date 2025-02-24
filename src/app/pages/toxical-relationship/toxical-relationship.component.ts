import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleCardComponent } from '../../components/title-card/title-card.component';

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
}
