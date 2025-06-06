import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import {
  catchError,
  filter,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GoogleSheetsService } from '../../../core/services/google-sheets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [],
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss',
})
export class MarqueeComponent {
  @Input() text?: string = '';

  readonly dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private readonly googleService = inject(GoogleSheetsService);

  successRegistration = signal(false);

  onClick() {
    const currentUrl = this.router.url;
    const isTestsUrl =
      currentUrl.includes('/questions') || currentUrl.includes('/details');
    if (isTestsUrl) {
      this.openDialog();
    } else {
      this.router.navigateByUrl('/consultations');
    }
  }

  private openDialog(): void {
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
        takeUntilDestroyed(this.destroyRef),
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
