import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { PrimaryBtnComponent } from '../../primary-btn/primary-btn.component';
import { GoogleSheetsService } from '../../../../core/services/google-sheets.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-consultations-card',
  standalone: true,
  imports: [MatIconModule, PrimaryBtnComponent],
  templateUrl: './consultations-card.component.html',
  styleUrl: './consultations-card.component.scss',
})
export class ConsultationsCardComponent {
  private dr = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private googleService = inject(GoogleSheetsService);

  @Input() card!: {
    title: string;
    list: {
      titleList: string;
      listCards: string[];
    };
    unfit: string;
  };

  successRegistration = signal(false);

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90vw',
      maxWidth: '1320px',
      data: {
        isForm: true,
        isShowLinks: false,
        contentType: 'form-consultation',
        title:
          'Залиши заявку та отримай у подарунок гайд, який допоможе знайти свою пару відповідно до твого типу особистості 🎁',
        btn: {
          cancel: 'Ні, дякую',
          confirm: 'Надіслати',
        },
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.dr),
        filter((r) => !!r),
        switchMap((r) =>
          this.googleService.postRegistrationInSheet(r).pipe(
            tap(() => this.successRegistration.set(true)),
            catchError((error) => {
              this.successRegistration.set(false);
              return throwError(() => error);
            })
          )
        )
      )
      .subscribe(() => {});
  }
}
