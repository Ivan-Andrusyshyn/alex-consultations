import { Component, DestroyRef, inject, signal } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { ModalComponent } from '../../components/modal/modal.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ConsultationComponent } from '../../components/consultation/consultation.component';
import { TestListHeroComponent } from '../../components/test/test-list-hero/test-list-hero.component';
import { GoogleSheetsService } from '../../shared/services/google-sheets.service';
import { PrimaryBtnComponent } from '../../components/primary-btn/primary-btn.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    PrimaryBtnComponent,
    TestListHeroComponent,
    ConsultationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
