import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  currentIndex = 0;
  isMobDevice = window.innerWidth < 764;

  private touchStartX = 0;
  private touchEndX = 0;

  constructor() {}
  next(bigCards: boolean, slideCards: any): number {
    if (bigCards) {
      this.currentIndex = (this.currentIndex + 1) % slideCards.length;

      return this.currentIndex;
    }
    if (this.isMobDevice) {
      this.currentIndex = (this.currentIndex + 1) % slideCards.length;
    } else {
      this.currentIndex = (this.currentIndex + 3) % slideCards.length;
    }
    return this.currentIndex;
  }

  prev(bigCards: boolean, slideCards: any): number {
    if (bigCards) {
      this.currentIndex =
        (this.currentIndex - 1 + slideCards.length) % slideCards.length;
      return this.currentIndex;
    }
    if (this.isMobDevice) {
      this.currentIndex =
        (this.currentIndex - 1 + slideCards.length) % slideCards.length;
    } else {
      this.currentIndex =
        (this.currentIndex - 3 + slideCards.length) % slideCards.length;
    }
    return this.currentIndex;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(bigCards: boolean, slideCards: any, event: TouchEvent): number {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture(bigCards, slideCards);
    return this.currentIndex;
  }

  private handleSwipeGesture(bigCards: boolean, slideCards: any) {
    const deltaX = this.touchEndX - this.touchStartX;

    if (Math.abs(deltaX) < 50) return;

    if (deltaX > 0) {
      this.prev(bigCards, slideCards);
    } else {
      this.next(bigCards, slideCards);
    }
  }

  goToSlide(index: number): number {
    this.currentIndex = index;
    return this.currentIndex;
  }
}
