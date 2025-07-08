import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [],
  templateUrl: './card-payment.component.html',
  styleUrl: './card-payment.component.scss',
})
export class CardPaymentComponent {
  @Input() imgUrl!: string;
  @Input() testPrice: string | null = null;
  @Input() cardTitle: string = '';
  @Input() testSubtitleText!: string;

  @Output() createMonoPaymentByClick = new EventEmitter();

  createMonoPayment() {
    this.createMonoPaymentByClick.emit();
  }
}
