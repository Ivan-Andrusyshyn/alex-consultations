import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TestCardInfoBtnComponent } from '../test-card-info-btn/test-card-info-btn.component';
import { TestCardStartBtnComponent } from '../test-card-start-btn/test-card-start-btn.component';
import { testButtonData } from '../../../content/tests-content/test-btn-data';

@Component({
  selector: 'app-test-list-hero',
  standalone: true,
  imports: [NgFor, TestCardInfoBtnComponent, TestCardStartBtnComponent],
  templateUrl: './test-list-hero.component.html',
  styleUrl: './test-list-hero.component.scss',
})
export class TestListHeroComponent {
  testData = testButtonData;

  @ViewChild('testList', { static: false }) testList!: ElementRef;

  scroll(direction: 'next' | 'prev') {
    const list = document.querySelector('.test-list') as HTMLElement;
    if (list) {
      const cardWidth = list.querySelector('.test-card')?.clientWidth || 300;
      list.scrollBy({
        left: direction === 'next' ? cardWidth + 32 : -(cardWidth + 32),
        behavior: 'smooth',
      });
    }
  }
}
