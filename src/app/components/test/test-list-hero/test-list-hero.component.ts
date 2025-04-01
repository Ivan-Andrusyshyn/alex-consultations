import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { delay, Subscription, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { testCardsData } from '../../../../assets/content/tests-content/test-cards-data';
import { TestCardHeroComponent } from '../test-card-hero/test-card-hero.component';

type HideTestsCard =
  | 'attractiveness-card'
  | 'toxical-card'
  | 'personality-card'
  | 'traumatic-card'
  | 'role-in-relationships-card';

@Component({
  selector: 'app-test-list-hero',
  standalone: true,
  imports: [NgFor, TestCardHeroComponent],
  templateUrl: './test-list-hero.component.html',
  styleUrl: './test-list-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestListHeroComponent implements OnInit {
  testData = testCardsData;

  private destroyRef = inject(DestroyRef);
  @Input() hideTestsCard: HideTestsCard | '' = '';
  @ViewChild('testList', { static: false }) testList!: ElementRef;
  timer$!: Subscription;

  ngOnInit(): void {
    this.timer$ = timer(300)
      .pipe(
        tap(() => this.scroll('next')),
        delay(900),
        tap(() => this.scroll('prev')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {});
  }

  scroll(direction: 'next' | 'prev') {
    const list = document.querySelector('.test-list') as HTMLElement;
    if (list) {
      const cardWidth = list.querySelector('.test-card')?.clientWidth || 300;
      list.scrollBy({
        left: direction === 'next' ? cardWidth + 18 : -(cardWidth + 18),
        behavior: 'smooth',
      });
    }
  }
}
