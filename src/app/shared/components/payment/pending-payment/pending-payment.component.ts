import { Component, EventEmitter, Output } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
//
//

import { DotsLoaderComponent } from '../../dots-loader/dots-loader.component';

@Component({
  selector: 'app-pending-payment',
  standalone: true,
  imports: [MatSpinner, DotsLoaderComponent],
  templateUrl: './pending-payment.component.html',
  styleUrl: './pending-payment.component.scss',
})
export class PendingPaymentComponent {
  @Output() close = new EventEmitter<void>();

  closeButtonClick() {
    this.close.emit();
  }
}
