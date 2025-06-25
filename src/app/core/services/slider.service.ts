import { Injectable } from '@angular/core';

import { SLIDER_KEYS } from '../../shared/models/slider';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  currentIndex = new Map<string, number>();
  isMobCardType = window.innerWidth < 1320;

  private touchStartX = 0;
  private touchEndX = 0;

  constructor() {}
  next(sliderKey: SLIDER_KEYS, bigCards: boolean, slideCards: any[]): number {
    if (slideCards.length === 0) return 0;

    const current = this.currentIndex.get(sliderKey) ?? 0;
    const step = Math.min(
      bigCards || this.isMobCardType ? 1 : 3,
      slideCards.length
    );

    const numberIteration = step * 3;
    const newIndex = (current + step) % numberIteration;

    this.currentIndex.set(sliderKey, newIndex);
    return newIndex;
  }

  prev(sliderKey: SLIDER_KEYS, bigCards: boolean, slideCards: any[]): number {
    if (slideCards.length === 0) return 0;
    const current = this.currentIndex.get(sliderKey) ?? 0;
    const step = Math.min(
      bigCards || this.isMobCardType ? 1 : 3,
      slideCards.length
    );
    const numberIteration = step * 3;

    const newIndex = (current - step + numberIteration) % numberIteration;
    this.currentIndex.set(sliderKey, newIndex);
    return newIndex;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(
    sliderKey: SLIDER_KEYS,
    bigCards: boolean,
    slideCards: any[],
    event: TouchEvent
  ): number {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture(sliderKey, bigCards, slideCards);
    return this.currentIndex.get(sliderKey) ?? 0;
  }

  private handleSwipeGesture(
    sliderKey: SLIDER_KEYS,
    bigCards: boolean,
    slideCards: any[]
  ) {
    const deltaX = this.touchEndX - this.touchStartX;

    if (Math.abs(deltaX) < 50) return;

    if (deltaX > 0) {
      this.prev(sliderKey, bigCards, slideCards);
    } else {
      this.next(sliderKey, bigCards, slideCards);
    }
  }

  goToSlide(sliderKey: SLIDER_KEYS, index: number): number {
    this.currentIndex.set(sliderKey, index);
    return index;
  }
}
