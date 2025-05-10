import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import {
  catchError,
  concatMap,
  filter,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { ModalComponent } from '../../shared/components/modal/modal.component';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { MobComponent } from './mob/mob.component';
import { StickyHeaderDirective } from './sticky-header.directive';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, StickyHeaderDirective, MobComponent, LogoComponent],
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
    const firstDelay = 60000 * 1.5;
    const secondDelay = 60000 * 6;

    timer(firstDelay)
      .pipe(
        tap(() => this.openDialog),
        concatMap(() => timer(secondDelay)),
        tap(() => this.openDialog())
      )
      .subscribe();
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.counter += 1;

    if (this.counter % 4 === 0) {
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
  openInstagram(): void {
    window.open(
      'https://www.instagram.com/depth_seekerr?igsh=MTZuNGxudnNrNWYzeg%3D%3D&utm_source=qr',
      '_blank'
    );
  }
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
