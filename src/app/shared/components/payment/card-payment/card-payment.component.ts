import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
//
import { LottieComponent } from 'ngx-lottie';

//
import { TestName } from '../../../models/tests/common-tests';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [LottieComponent, NgIf],
  templateUrl: './card-payment.component.html',
  styleUrl: './card-payment.component.scss',
})
export class CardPaymentComponent {
  @Input() imgUrl!: string;
  @Input() testPrice: string | null = null;
  @Input() cardTitle: string = '';
  @Input() testSubtitleText!: string;
  @Input() testName!: TestName;

  @Output() createMonoPaymentByClick = new EventEmitter();
  //

  options = {
    path: '',
    loop: true,
    autoplay: true,
  };
  readonly baseAssetUrl = 'assets/new/core/animations/tests/';
  //
  ngOnInit(): void {
    //
    this.options.path = `${this.baseAssetUrl}${this.testName}-1.json`;
  }
  //
  createMonoPayment() {
    this.createMonoPaymentByClick.emit();
  }
}
