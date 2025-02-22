import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TestCardInfoBtnComponent } from '../test-card-info-btn/test-card-info-btn.component';
import { TestCardStartBtnComponent } from '../test-card-start-btn/test-card-start-btn.component';
import { testButtonData } from '../../../content/tests-content/test-btn-data';

@Component({
  selector: 'app-test-list-hero',
  standalone: true,
  imports: [NgFor, TestCardInfoBtnComponent, TestCardStartBtnComponent],
  templateUrl: './test-list-hero.component.html',
  styleUrl: './test-list-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestListHeroComponent implements OnInit, OnDestroy {
  testData = testButtonData;

  @ViewChild('testList', { static: false }) testList!: ElementRef;

  timers: any = [];

  ngOnDestroy(): void {
    for (let i = 0; i < this.timers.length; i++) {
      clearTimeout(this.timers[i]);
    }
  }

  ngOnInit(): void {
    let timeTwo;
    const timerOne = setTimeout(() => {
      this.scroll('next');
      timeTwo = setTimeout(() => {
        this.scroll('prev');
      }, 900);

      this.timers.push(timerOne);
      this.timers.push(timeTwo);
    }, 300);
  }

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
