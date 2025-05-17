import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { interval, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { TEST_CARDS } from '../../../../assets/content/TEST_CARDS';
import { SliderService } from '../../../core/services/slider.service';
import { PrimaryBtnComponent } from '../primary-btn/primary-btn.component';
import { SliderControlsBtnComponent } from '../test/slider-controls-btn/slider-controls-btn.component';
import { TestCardComponent } from '../test/test-card/test-card.component';
import { SLIDER_KEYS } from '../../models/slider';

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
  private sliderService = inject(SliderService);

  @Input() bigCards: boolean = true;
  @Input() sliderKey!: SLIDER_KEYS;

  currentIndex = signal(0);
  slideCards = TEST_CARDS;
  isMobCardType = window.innerWidth < 1320;

  ngOnInit(): void {
    this.currentIndex.set(
      this.sliderService.currentIndex.get(this.sliderKey) ?? 0
    );

    interval(7000)
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
    const cardIndex = this.sliderService.next(
      this.sliderKey,
      this.bigCards,
      this.slideCards
    );
    this.currentIndex.set(cardIndex);
  }

  prev() {
    const cardIndex = this.sliderService.prev(
      this.sliderKey,
      this.bigCards,
      this.slideCards
    );
    this.currentIndex.set(cardIndex);
  }
  startTest(testUrl: string): void {
    this.router.navigateByUrl(testUrl);
  }

  onTouchStart(event: TouchEvent) {
    this.sliderService.onTouchStart(event);
  }

  onTouchEnd(event: TouchEvent) {
    const cardIndex = this.sliderService.onTouchEnd(
      this.sliderKey,
      this.bigCards,
      this.slideCards,
      event
    );
    this.currentIndex.set(cardIndex);
  }

  goToSlide(index: number) {
    const cardIndex = this.sliderService.goToSlide(this.sliderKey, index);
    this.currentIndex.set(cardIndex);
  }
}
