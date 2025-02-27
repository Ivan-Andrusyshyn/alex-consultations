import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { TitleCardComponent } from '../../components/title-card/title-card.component';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-personalities-test',
  standalone: true,
  imports: [RouterOutlet, TitleCardComponent],
  templateUrl: './personalities-test.component.html',
  styleUrl: './personalities-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalitiesTestComponent implements OnInit {
  svgName = { url: 'assets/svg/tests/icons-tests.svg#stretching' };
  imgUrl = 'assets/imgs/yoga-love.jpg';
  subtitleText =
    'Цей тест допоможе тобі краще зрозуміти свої природні схильності.';
  titleText = 'Тест 16 типів особистості';
  private seoService = inject(SeoService);
  ngOnInit(): void {
    this.seoService.updateTitle(
      'Тест 16 типів особистості | Дізнайся більше про себе'
    );
    this.seoService.updateMetaTags(
      'Пройди тест 16 типів особистості та дізнайся більше про свої сильні сторони, слабкі сторони та особливості характеру.',
      'тест, 16 типів особистості, MBTI, психологія, саморозвиток, особистість'
    );
  }
}
