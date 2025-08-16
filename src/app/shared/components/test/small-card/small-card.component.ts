import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
//
import { map, Observable, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
//
import { CardContent, TestName } from '../../../models/tests/common-tests';
import { MonopayService } from '../../../../core/services/payment/monopay.service';
import { MonoPaymentCheckStatusResponse } from '../../../models/payment/monopayment';
//

interface PaidData {
  invoiceId: string;
  testName: TestName;
  imgUrl: string;
  title: string;
  price: string;
}

@Component({
  selector: 'app-small-card',
  standalone: true,
  imports: [AsyncPipe, MatIconModule],

  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCardComponent {
  @Input() card!: CardContent;
  //
  private monopayService = inject(MonopayService);

  //
  private router = inject(Router);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  //
  currentIndex = signal(0);
  isMobile: boolean = window.innerWidth < 764;
  testPrice$!: Observable<MonoPaymentCheckStatusResponse | string>;
  paidPriceText = 'Ваша покупка';

  //
  ngOnInit(): void {
    this.changePriceState();

    //
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  private changePriceState() {
    const paidData = JSON.parse(
      localStorage.getItem(this.card.testName + '-paid-testInfo') ?? 'null'
    ) as PaidData;
    //
    const testPriceState = this.card.testPrice
      ? 'Вартість: ' + this.card.testPrice + 'грн'
      : 'Безкоштовно';
    //
    if (paidData) {
      this.testPrice$ = this.monopayService
        .checkStatus(paidData.testName, paidData.invoiceId)
        .pipe(
          map((response) =>
            response.status === 'success' ? this.paidPriceText : testPriceState
          )
        );
    } else {
      this.testPrice$ = of(testPriceState);
    }
  }
  //
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
}
