import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

import { SeoService } from '../../core/services/seo.service';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import titleCardContent from './titleCard-content';
import { CardContent } from '../../shared/models/common-tests';
import { TestCardComponent } from '../../shared/components/test/test-card/test-card.component';
import { TEST_CARDS } from '../../core/content/TEST_CARDS';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [
    TitleCardComponent,
    NgTemplateOutlet,
    MatTabsModule,
    TestCardComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestsComponent implements OnInit {
  readonly testCards: CardContent[] = TEST_CARDS;
  readonly titleCardContent = titleCardContent;
  readonly dialog = inject(MatDialog);
  private readonly route = inject(Router);
  private seoService = inject(SeoService);
  focusedCardIndex = signal<number | null>(null);
  isMobDevice = signal<boolean>(window.innerWidth < 764);

  readonly categoryList = ['Для стосунків', 'Для особистого розвитку'];
  currentTopic: string = '';
  groupedCards = [
    {
      tabsLabel: 'Особистість',
      category: 'Для особистого розвитку',
      cards: this.testCards.filter(
        (card) => card.category === 'Для особистого розвитку'
      ),
    },
    {
      tabsLabel: 'Стосунки',
      category: 'Для стосунків',
      cards: this.testCards.filter((card) => card.category === 'Для стосунків'),
    },
  ];

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.seoService.updateTitle(
      'Список тестів | Оцініть свої можливості та особистість'
    );
    this.seoService.updateMetaTags(
      'Переглянь список доступних тестів для самопізнання, розвитку особистості та оцінки стосунків. Обери тест і дізнайся більше про себе.',
      'список тестів, самопізнання, розвиток особистості, психологічні тести, тести для стосунків, тест на особистість, саморозвиток'
    );
  }
  startTestOnClick(testUrl: string) {
    this.route.navigateByUrl(testUrl);
  }
}
