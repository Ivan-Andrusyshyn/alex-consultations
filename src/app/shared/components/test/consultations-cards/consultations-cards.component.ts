import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { consultationCards } from './cards';
import { SliderControlsBtnComponent } from '../slider-controls-btn/slider-controls-btn.component';
import { PrimaryBtnComponent } from '../../primary-btn/primary-btn.component';
import { ModalComponent } from '../../modal/modal.component';
import { GoogleSheetsService } from '../../../../core/services/google-sheets.service';
import { SliderService } from '../../../../core/services/slider.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-consultations-cards',
  standalone: true,
  imports: [SliderControlsBtnComponent, MatIconModule, PrimaryBtnComponent],
  templateUrl: './consultations-cards.component.html',
  styleUrl: './consultations-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationsCardsComponent {
  private dr = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private googleService = inject(GoogleSheetsService);
  private sliderService = inject(SliderService);

  successRegistration = signal(false);
  cards: {
    title: string;
    list: {
      titleList: string;
      listCards: string[];
    };
    unfit: string;
  }[];
  currentIndex = signal<number>(0);

  constructor() {
    this.cards = consultationCards;
  }

  next() {
    const cardIndex = this.sliderService.next(true, this.cards);
    this.currentIndex.set(cardIndex);
  }

  prev() {
    const cardIndex = this.sliderService.prev(true, this.cards);
    this.currentIndex.set(cardIndex);
  }

  onTouchStart(event: TouchEvent) {
    this.sliderService.onTouchStart(event);
  }

  onTouchEnd(event: TouchEvent) {
    const cardIndex = this.sliderService.onTouchEnd(true, this.cards, event);
    this.currentIndex.set(cardIndex);
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
