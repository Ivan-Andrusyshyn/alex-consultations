import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleCardComponent } from '../../components/title-card/title-card.component';

@Component({
  selector: 'app-traumatic-sensitivity',
  standalone: true,
  imports: [RouterOutlet, TitleCardComponent],
  templateUrl: './traumatic-sensitivity.component.html',
  styleUrl: './traumatic-sensitivity.component.scss',
})
export class TraumaticSensitivityComponent {
  imgUrl = 'assets/imgs/women-doubs.jpg';
  subtitleText =
    'Цей тест допоможе зрозуміти, як реагуєш на критику, емоції та думку інших.';
  titleText = 'Чутливість: твоя суперсила чи виклик?';
}
