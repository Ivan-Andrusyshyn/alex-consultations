import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, filter, interval, switchMap, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { CubeComponent } from '../cube/cube.component';
import { MobComponent } from './mob/mob.component';
import { ToggleBtnComponent } from '../toggle-btn/toggle-btn.component';
import { StickyHeaderDirective } from './sticky-header.directive';

import { GoogleSheetsService } from '../../shared/services/google-sheets.service';
import { ModalComponent } from '../modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    StickyHeaderDirective,
    ToggleBtnComponent,
    MobComponent,
    CubeComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  hiddenRoutes = true;
  readonly dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private readonly googleService = inject(GoogleSheetsService);
  private _snackBar = inject(MatSnackBar);

  banners = [
    () => this.openDialog(),
    () =>
      this.openSnackBar(
        'Запишись на консультацію, щоб пізнати себе ще краще!',
        'Записатися'
      ),
  ];

  ngOnInit(): void {
    const intervalTime = 60000 * 2;
    let currentIndex = 0;

    interval(intervalTime).subscribe(() => {
      if (currentIndex > this.banners.length) {
        currentIndex = 0;
      }
      this.banners[currentIndex]();

      currentIndex = (currentIndex + 1) % this.banners.length;
    });
  }
  openSnackBar(text: string, textBtn: string) {
    const snackBarRef = this._snackBar.open(text, textBtn, {
      verticalPosition: 'bottom',
      duration: 6000,
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'center',
    });

    snackBarRef.onAction().subscribe(() => {
      this.openDialog();
    });
  }
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
            tap(() =>
              this.openSnackBar(
                'Дякуємо! Ви успішно записалися на консультацію.',
                'Закрити'
              )
            ),
            catchError((error) => {
              this.openSnackBar(
                'Нажаль сталася помила, спробуйте пізніше.',
                'Закрити'
              );
              return throwError(() => error);
            })
          )
        )
      )
      .subscribe();
  }
}
