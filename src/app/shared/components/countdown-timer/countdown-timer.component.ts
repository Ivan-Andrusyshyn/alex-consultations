import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { GoogleSheetsService } from '../../../core/services/google-sheets.service';
import { ModalService } from '../../../core/services/modal.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PrimaryBtnComponent } from '../primary-btn/primary-btn.component';
import { CountDownTimerDirective } from './count-down.directive';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [PrimaryBtnComponent, CountDownTimerDirective],
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownTimerComponent {
  textBtn = 'Записатися';

  @Input() testName: string = '';

  private dr = inject(DestroyRef);
  private googleService = inject(GoogleSheetsService);
  private modalService = inject(ModalService);
  private notificationService = inject(NotificationService);

  // dialog
  openDialog(): void {
    this.modalService
      .openModal({
        width: '90vw',
        isForm: true,
        isConfirm: false,
      })
      .pipe(
        takeUntilDestroyed(this.dr),
        filter((r) => !!r),
        switchMap((r) =>
          this.googleService.postRegistrationInSheet(r).pipe(
            tap(() => this.showSuccess()),
            catchError((error) => {
              this.showError();
              return throwError(() => error);
            })
          )
        )
      )
      .subscribe(() => {});
  }
  private showSuccess() {
    this.notificationService.setNotification(
      '✅ Дякуємо! Вас успішно записано на безкоштовну консультацію. Ми скоро з вами зв’яжемося!'
    );
  }
  private showError() {
    this.notificationService.setNotification(
      '❌ Сталася помилка під час запису на консультацію. Спробуйте ще раз.'
    );
  }
}
