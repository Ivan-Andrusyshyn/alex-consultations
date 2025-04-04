import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';

import { TestCardStartBtnComponent } from '../../components/test/test-card-start-btn/test-card-start-btn.component';
import { TestCardInfoBtnComponent } from '../../components/test/test-card-info-btn/test-card-info-btn.component';
import { testCardsData } from '../../../assets/content/tests-content/test-cards-data';
import { TitleCardComponent } from '../../components/title-card/title-card.component';
import { SeoService } from '../../shared/services/seo.service';
import { IconsListComponent } from '../../components/test/personalities-test/icons-list/icons-list.component';
import titleCardContent from './titleCard-content';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [
    TestCardStartBtnComponent,
    TitleCardComponent,
    TestCardInfoBtnComponent,
    NgClass,
    MatTabsModule,
    IconsListComponent,
  ],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent implements OnInit {
  readonly testData = testCardsData;
  readonly titleCardContent = titleCardContent;
  readonly dialog = inject(MatDialog);

  private seoService = inject(SeoService);

  readonly categoryList = [
    'Всі тести',
    'Для стосунків',
    'Для особистого розвитку',
  ];
  currentTopic: string = '';

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

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '550px',
      width: '330px',
      data: {
        isForm: false,
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
