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
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import titleCardContent from './titleCard-content';
import { TEST_CARDS } from '../../../assets/content/TEST_CARDS';
import { CardContent } from '../../shared/models/common-tests';
import { TestCardComponent } from '../../shared/components/test/test-card/test-card.component';

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
    const isNewUser = JSON.parse(sessionStorage.getItem('isNewUser') ?? 'null');
    if (!isNewUser) {
      this.openDialog();
      sessionStorage.setItem('isNewUser', JSON.stringify(true));
    }

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
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90vw',
      maxWidth: '1320px',
      data: {
        isForm: false,
        isConfirm: false,
        contentType: 'form-consultation',
        title: 'Відчуй свою глибину. Запишись на консультацію.',
        btn: {
          cancel: 'Ні, дякую',
          confirm: 'Записатися',
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
