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
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

import { PrimaryBtnComponent } from '../../primary-btn/primary-btn.component';
import { CardContent } from '../../../models/tests/common-tests';
import { PaidStorageData } from '../../../models/payment/monopayment';

@Component({
  selector: 'app-test-card',
  standalone: true,
  imports: [PrimaryBtnComponent, NgIf, MatIconModule],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardComponent implements OnInit, OnDestroy {
  @Input() card!: CardContent;
  @Input() smallCard?: boolean = false;

  private router = inject(Router);
  //
  private intervalId: ReturnType<typeof setInterval> | null = null;
  //
  currentIndex = signal(0);
  isMobile: boolean = window.innerWidth < 764;
  paidPriceText = 'Ваша покупка';
  testPriceText!: string;

  //
  ngOnInit(): void {
    this.changePriceState();
    this.startCarousel();
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

  startTest(): void {
    this.router.navigateByUrl(this.card.routeStart);
  }

  private changePriceState() {
    const paidData = JSON.parse(
      localStorage.getItem(this.card.testName + '-paid-testInfo') ?? 'null'
    ) as PaidStorageData;
    //
    if (paidData && paidData.testPriceText) {
      this.testPriceText = paidData.testPriceText;
    } else {
      this.testPriceText = this.card.testPrice
        ? 'Вартість: ' + this.card.testPrice + 'грн'
        : 'Безкоштовно';
    }
    //
  }
}
