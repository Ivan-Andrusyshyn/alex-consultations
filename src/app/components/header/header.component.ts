import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { catchError, filter, interval, switchMap, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

import { CubeComponent } from '../cube/cube.component';
import { MobComponent } from './mob/mob.component';
import { ToggleBtnComponent } from '../toggle-btn/toggle-btn.component';
import { StickyHeaderDirective } from './sticky-header.directive';

import { GoogleSheetsService } from '../../shared/services/google-sheets.service';
import { ModalComponent } from '../modal/modal.component';

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

  private counter: number = 0;
  ngOnInit(): void {
    const intervalTime = 60000 * 4;
    interval(intervalTime).subscribe(() => {
      this.openDialog();
    });
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.counter += 1;

    if (this.counter % 3 === 0) {
      this.openDialog();
    }
  }
  openSnackBar(text: string, textBtn: string) {
    const snackBarRef = this._snackBar.open(text, textBtn, {
      verticalPosition: 'bottom',
      duration: 6000,
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'center',
    });

    snackBarRef.onAction().subscribe(() => {});
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '400px',
      width: '400px',
      data: {
        contentType: 'form-consultation',
        title: 'Запис на консультацію ще відкритий.',
        btn: {
          cancel: 'Ні, дякую',
          confirm: 'Записатися',
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
      .subscribe((result) => {});
  }
}
