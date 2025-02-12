import { Component, inject, OnInit } from '@angular/core';

import { TestCardStartBtnComponent } from '../../components/test-card-start-btn/test-card-start-btn.component';
import { TestCardInfoBtnComponent } from '../../components/test-card-info-btn/test-card-info-btn.component';
import { NgFor } from '@angular/common';
import { testButtonData } from '../../content/tests-content/test-btn-data';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [TestCardStartBtnComponent, TestCardInfoBtnComponent, NgFor],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent {
  testData = testButtonData;
}
