import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { SeoService } from '../../core/services/seo.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import titleCardContent from './titleCard-content';
import { TestCardComponent } from '../../shared/components/test-card/test-card.component';
import { TEST_CARDS } from '../../../assets/content/TEST_CARDS';
import { CardContent } from '../../shared/models/common-tests';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [TitleCardComponent, MatTabsModule, TestCardComponent, NgFor, NgIf],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent implements OnInit {
  readonly testCards: CardContent[] = TEST_CARDS;
  readonly titleCardContent = titleCardContent;
  readonly dialog = inject(MatDialog);
  private readonly route = inject(Router);
  private seoService = inject(SeoService);
  focusedCardIndex = signal<number | null>(null);

  readonly categoryList = ['Для стосунків', 'Для особистого розвитку'];
  currentTopic: string = '';
  groupedCards = [
    {
      category: 'Для особистого розвитку',
      cards: this.testCards.filter(
        (card) => card.category === 'Для особистого розвитку'
      ),
    },
    {
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
      height: '550px',
      width: '350px',
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
