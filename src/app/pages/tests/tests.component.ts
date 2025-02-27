import { Component, inject } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

import { TestCardStartBtnComponent } from '../../components/test/test-card-start-btn/test-card-start-btn.component';
import { TestCardInfoBtnComponent } from '../../components/test/test-card-info-btn/test-card-info-btn.component';
import { testCardsData } from '../../content/tests-content/test-cards-data';
import { TitleCardComponent } from '../../components/title-card/title-card.component';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [
    TestCardStartBtnComponent,
    TitleCardComponent,
    TestCardInfoBtnComponent,
    NgFor,
    NgClass,
  ],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent {
  testData = testCardsData;
  imgUrl = 'assets/imgs/person-thinking-1.jpg';
  subtitleText =
    ' Заощадь роки на пошуках себе. Відкрий нові грані своєї особистостівже зараз!';
  titleText =
    'Дізнайся про себе більше – швидкі тести, що відкриють твою особистість!';

  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateTitle(
      'Список тестів | Оцініть свої можливості та особистість'
    );
    this.seoService.updateMetaTags(
      'Переглянь список доступних тестів для самопізнання, розвитку особистості та оцінки стосунків. Обери тест і дізнайся більше про себе.',
      'список тестів, самопізнання, розвиток особистості, психологічні тести, тести для стосунків, тест на особистість, саморозвиток'
    );
  }
}
