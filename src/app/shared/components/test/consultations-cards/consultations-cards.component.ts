import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { consultationCards } from './cards';
import { SliderControlsBtnComponent } from '../slider-controls-btn/slider-controls-btn.component';
import { SliderService } from '../../../../core/services/slider.service';
import { ConsultationsCardComponent } from '../consultations-card/consultations-card.component';

@Component({
  selector: 'app-consultations-cards',
  standalone: true,
  imports: [
    SliderControlsBtnComponent,
    MatIconModule,
    ConsultationsCardComponent,
  ],
  templateUrl: './consultations-cards.component.html',
  styleUrl: './consultations-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationsCardsComponent {
  private sliderService = inject(SliderService);

  successRegistration = signal(false);
  cards: {
    title: string;
    list: {
      titleList: string;
      listCards: string[];
    };
    unfit: string;
  }[];
  currentIndex = signal<number>(0);

  isPrevDisabled = computed(() => this.currentIndex() === 0);
  isNextDisabled = computed(() => this.currentIndex() >= this.cards.length - 1);

  constructor() {
    this.cards = consultationCards;
  }

  next() {
    if (!this.isNextDisabled()) {
      const cardIndex = this.sliderService.next(true, this.cards);
      this.currentIndex.set(cardIndex);
    }
  }

  prev() {
    if (!this.isPrevDisabled()) {
      const cardIndex = this.sliderService.prev(true, this.cards);
      this.currentIndex.set(cardIndex);
    }
  }

  onTouchStart(event: TouchEvent) {
    this.sliderService.onTouchStart(event);
  }

  onTouchEnd(event: TouchEvent) {
    const current = this.currentIndex();

    const cardIndex = this.sliderService.onTouchEnd(true, this.cards, event);

    if (
      (cardIndex > current && !this.isNextDisabled()) ||
      (cardIndex < current && !this.isPrevDisabled())
    ) {
      this.currentIndex.set(cardIndex);
    }
  }
}
