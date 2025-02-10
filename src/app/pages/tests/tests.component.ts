import { Component, inject, OnInit } from '@angular/core';

import { TestCardStartBtnComponent } from '../../components/test-card-start-btn/test-card-start-btn.component';
import { TestCardInfoBtnComponent } from '../../components/test-card-info-btn/test-card-info-btn.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [TestCardStartBtnComponent, TestCardInfoBtnComponent, NgFor],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent {
  testData = [
    {
      title: 'Тест 16 типів особистості',
      description: 'Дізнайся більше про себе, свої сильні та слабкі сторони.',
      routeStart: '/tests/16-personalities/questions',
      routeInfo: '/tests/16-personalities/test-information',
    },
    {
      title: 'Тест на травматичну чуттєвість',
      description: 'Як сильно ти реагуєш на коментарі та зауваження?',
      routeStart: '/tests/traumatic-sensitivity/questions',
      routeInfo: '/tests/traumatic-sensitivity/test-information',
    },
  ];
}
