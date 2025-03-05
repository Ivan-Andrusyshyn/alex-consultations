import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { TestCardStartBtnComponent } from '../../components/test/test-card-start-btn/test-card-start-btn.component';
import { TestCardInfoBtnComponent } from '../../components/test/test-card-info-btn/test-card-info-btn.component';
import { testCardsData } from '../../../assets/content/tests-content/test-cards-data';
import { TitleCardComponent } from '../../components/title-card/title-card.component';
import { SeoService } from '../../shared/services/seo.service';
import { IconsListComponent } from '../../components/test/personalities-test/icons-list/icons-list.component';
import { CommonTestsService } from '../../shared/services/common-tests.service';
import titleCardContent from './titleCard-content';

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

  private seoService = inject(SeoService);
  private commonTestsService = inject(CommonTestsService);

  readonly categoryList = [
    'Всі тести',
    'Для стосунків',
    'Для особистого розвитку',
  ];
  currentTopic: string = '';

  ngOnInit(): void {
    this.seoService.updateTitle(
      'Список тестів | Оцініть свої можливості та особистість'
    );
    this.seoService.updateMetaTags(
      'Переглянь список доступних тестів для самопізнання, розвитку особистості та оцінки стосунків. Обери тест і дізнайся більше про себе.',
      'список тестів, самопізнання, розвиток особистості, психологічні тести, тести для стосунків, тест на особистість, саморозвиток'
    );

    this.commonTestsService.testPassingCounter().subscribe((r) => console.log);
  }
}
