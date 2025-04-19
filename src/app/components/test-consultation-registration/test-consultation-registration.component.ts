import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { ModalComponent } from '../modal/modal.component';
import { GoogleSheetsService } from '../../shared/services/google-sheets.service';
import { AccentBtnComponent } from '../accent-btn/accent-btn.component';

@Component({
  selector: 'app-test-consultation-registration',
  standalone: true,
  imports: [AccentBtnComponent],
  templateUrl: './test-consultation-registration.component.html',
  styleUrl: './test-consultation-registration.component.scss',
})
export class TestConsultationRegistrationComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private readonly googleService = inject(GoogleSheetsService);
  private destroyRef = inject(DestroyRef);

  @ViewChild('btnWrapper') btnWrapper!: ElementRef;

  ngOnInit(): void {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      startWith(null),
      map(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        const distanceToBottom = docHeight - (scrollY + windowHeight);
        return distanceToBottom <= 300;
      }),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    );

    scroll$.subscribe((shouldHide) => {
      if (this.btnWrapper?.nativeElement) {
        this.btnWrapper.nativeElement.style.display = shouldHide
          ? 'none'
          : 'block';
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '570px',
      width: '400px',
      data: {
        isForm: true,
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
            catchError((error) => {
              return throwError(() => error);
            })
          )
        )
      )
      .subscribe();
  }
}
