import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { AccentBtnComponent } from '../../components/accent-btn/accent-btn.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { GoogleSheetsService } from '../../shared/services/google-sheets.service';
import { ColorDotsComponent } from '../../components/color-dots/color-dots.component';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [
    MatFormFieldModule,
    AccentBtnComponent,
    ColorDotsComponent,

    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss',
})
export class ConsultationsComponent {
  readonly dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  private readonly googleService = inject(GoogleSheetsService);
  successRegistration = signal(false);

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '500px',
      width: '400px',
      data: {
        contentType: 'form-consultation',
        title: '🔥 Готові до прориву?',
        btn: {
          cancel: 'Ні, дякую',
          confirm: '🚀 Отримати консультацію',
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
      .subscribe();
  }
}
