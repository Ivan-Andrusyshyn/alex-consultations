import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { PrimaryBtnComponent } from '../../primary-btn/primary-btn.component';
import { GoogleSheetsService } from '../../../../core/services/google-sheets.service';
import { ModalComponent } from '../../modal/modal.component';
import { ModalService } from '../../../../core/services/modal.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-consultations-card',
  standalone: true,
  imports: [MatIconModule, PrimaryBtnComponent],
  templateUrl: './consultations-card.component.html',
  styleUrl: './consultations-card.component.scss',
})
export class ConsultationsCardComponent {
  private dr = inject(DestroyRef);
  private googleService = inject(GoogleSheetsService);
  private modalService = inject(ModalService);
  private notificationService = inject(NotificationService);

  @Input() card!: {
    title: string;
    list: {
      titleList: string;
      listCards: string[];
    };
    price: string;
    unfit: string;
  };

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
}
