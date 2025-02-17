import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { TestCardStartBtnComponent } from '../../components/test/test-card-start-btn/test-card-start-btn.component';
import { TestCardInfoBtnComponent } from '../../components/test/test-card-info-btn/test-card-info-btn.component';
import { testButtonData } from '../../content/tests-content/test-btn-data';
import { TitleCardComponent } from '../../components/title-card/title-card.component';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [
    TestCardStartBtnComponent,
    TitleCardComponent,
    TestCardInfoBtnComponent,
    NgFor,
  ],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent {
  testData = testButtonData;
  imgUrl = 'assets/imgs/person-thinking-1.jpg';
  subtitleText =
    ' Заощадь роки на пошуках себе. Відкрий нові грані своєї особистостівже зараз!';
  titleText = 'Пройди тестування та зрозумій себе краще.';
}
