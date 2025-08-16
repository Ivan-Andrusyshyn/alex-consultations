import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, tap } from 'rxjs';
//

import { TestQuestionsComponent } from '../../pages/test-questions/test-questions.component';
import { ModalComponent } from '../components/modal/modal.component';
import { StatusPayment } from '../models/payment/monopayment';

@Injectable({ providedIn: 'root' })
export class ConfirmExitGuard implements CanDeactivate<TestQuestionsComponent> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(
    component: TestQuestionsComponent
  ): Observable<boolean> | boolean {
    const status: StatusPayment | null = 'success' as const;
    const hasAnswers = Object.values(component.formGroup.value).find(
      (item) => item !== null || item !== ''
    );

    if (
      (component.formGroup.valid && !component.testPrice) ||
      (component.formGroup.valid && component.paymentStatus === status) ||
      !!!hasAnswers
    ) {
      return of(true);
    } else {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: {
          isDeactivateConfirm: true,
          title: 'Підтвердження виходу',
          message: 'Закрити сторінку та видалити ваші відповіді?',
          confirmText: 'Так, видалити',
          cancelText: 'Залишитися',
        },
        disableClose: true,
      });

      return dialogRef.afterClosed().pipe(
        tap((r) => {
          if (r) {
            component.onExitTest();
          }
        })
      );
    }
  }
}
