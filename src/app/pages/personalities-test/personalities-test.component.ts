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
  imports: [RouterOutlet],
  templateUrl: './personalities-test.component.html',
  styleUrl: './personalities-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalitiesTestComponent implements OnInit {
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
