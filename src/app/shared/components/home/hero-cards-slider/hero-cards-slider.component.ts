import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { interval, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TEST_CARDS } from '../../../../../assets/content/TEST_CARDS';
import { TestCardComponent } from '../../test-card/test-card.component';
import { SliderControlsBtnComponent } from '../../test/slider-controls-btn/slider-controls-btn.component';
import { PrimaryBtnComponent } from '../../primary-btn/primary-btn.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-cards-slider',
  standalone: true,
  imports: [TestCardComponent, SliderControlsBtnComponent, PrimaryBtnComponent],
  templateUrl: './hero-cards-slider.component.html',
  styleUrl: './hero-cards-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardsSliderComponent implements OnInit {
  private chr = inject(ChangeDetectorRef);
  private dr = inject(DestroyRef);
  private router = inject(Router);

  @Input() bigCards: boolean = true;

  currentIndex = 0;
  slideCards = TEST_CARDS;
  isMobDevice = window.innerWidth < 764;

  ngOnInit(): void {
    interval(6000)
      .pipe(
        takeUntilDestroyed(this.dr),
        tap(() => {
          this.next();
          this.chr.markForCheck();
        })
      )
      .subscribe();
  }

  next() {
    if (this.bigCards) {
      this.currentIndex = (this.currentIndex + 1) % this.slideCards.length;

      return;
    }
    if (this.isMobDevice) {
      this.currentIndex = (this.currentIndex + 1) % this.slideCards.length;
    } else {
      this.currentIndex = (this.currentIndex + 3) % this.slideCards.length;
    }
  }

  prev() {
    if (this.bigCards) {
      this.currentIndex =
        (this.currentIndex - 1 + this.slideCards.length) %
        this.slideCards.length;
      return;
    }
    if (this.isMobDevice) {
      this.currentIndex =
        (this.currentIndex - 1 + this.slideCards.length) %
        this.slideCards.length;
    } else {
      this.currentIndex =
        (this.currentIndex - 3 + this.slideCards.length) %
        this.slideCards.length;
    }
  }
  startTest(testUrl: string): void {
    this.router.navigateByUrl(testUrl);
  }
  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
