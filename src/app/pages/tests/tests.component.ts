import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
//

import { MatFormFieldModule } from '@angular/material/form-field';

import { SeoService } from '../../core/services/seo.service';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import titleCardContent from './titleCard-content';
import { CardContent } from '../../shared/models/tests/common-tests';
import { TestCardComponent } from '../../shared/components/test/test-card/test-card.component';
import { TEST_CARDS } from '../../core/content/TEST_CARDS';
import { fadeInAnimation } from '../test-questions/fadeIn-animation';
import { SmallCardComponent } from '../../shared/components/test/small-card/small-card.component';
import { ResizeOnVisibleDirective } from './resizeOnVisible.directive';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    MatTabsModule,
    TestCardComponent,
    SmallCardComponent,
    TitleCardComponent,
    MatFormFieldModule,
    NgFor,
    ResizeOnVisibleDirective,
    LottieComponent,
  ],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private readonly route = inject(Router);
  private seoService = inject(SeoService);
  //
  // Signals for state management
  isMobDevice = signal<boolean>(window.innerWidth < 480);
  focusedCardIndex = signal<number | null>(null);
  selectedTags = signal<string[]>([]);

  // Static content
  readonly testCards: CardContent[] = TEST_CARDS;
  readonly titleCardContent = titleCardContent;
  readonly categoryList: string[] = [
    'Для стосунків',
    'Безкоштовні',
    'Для особистого розвитку',
  ];
  readonly baseAssetUrl = 'assets/new/core/animations/pages/';

  //
  options = {
    path: '',
    loop: true,
    autoplay: true,
  };
  //
  currentTopic: string = '';
  visibleCards: boolean[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.isMobDevice.set(width < 480);
  }

  filteredItems = computed(() => {
    const selected = this.selectedTags();
    if (selected.length === 0) return this.testCards;
    return this.testCards.filter((item) => {
      if (selected.includes('Безкоштовні') && item.testPrice === null) {
        return true;
      }
      return selected.every((tag) => item.category.includes(tag)) ?? false;
    });
  });

  //
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
    //
    this.options.path = `${this.baseAssetUrl}tests-page.json`;
    //
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

  toggleTag(tag: string) {
    const current = this.selectedTags();
    if (current.includes(tag)) {
      this.selectedTags.set(current.filter((t) => t !== tag));
    } else {
      this.selectedTags.set([...current, tag]);
    }
  }

  // Перевірка, чи активний тег
  isTagSelected(tag: string): boolean {
    return this.selectedTags().includes(tag);
  }
}
