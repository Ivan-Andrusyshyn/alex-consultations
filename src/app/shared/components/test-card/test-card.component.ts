import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

import { PrimaryBtnComponent } from '../primary-btn/primary-btn.component';
import { CardContent } from '../../models/common-tests';
import { interval } from 'rxjs';

@Component({
  selector: 'app-test-card',
  standalone: true,
  imports: [PrimaryBtnComponent, NgIf],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.scss',
  animations: [
    trigger('imageFade', [
      transition(':increment', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':decrement', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardComponent implements OnInit, OnDestroy {
  @Input() card!: CardContent;

  private router = inject(Router);
  currentIndex = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  isMobile: boolean = window.innerWidth < 764;

  ngOnInit(): void {
    if (this.isMobile) {
      this.startCarousel();
    }
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  startCarousel(): void {
    if (this.intervalId || !this.card?.imgList?.length) return;

    this.intervalId = setInterval(() => {
      this.currentIndex.update((prev) => (prev + 1) % this.card.imgList.length);
    }, 3000);
  }

  stopCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getCurrentImgUrl(): string {
    const index = this.currentIndex();
    if (!this.card?.imgList?.length) return '';
    return `${this.card.imageUrl}carousel/${this.card.imgList[index]}.svg`;
  }

  startTest(): void {
    this.router.navigateByUrl(this.card.routeStart);
  }
}
