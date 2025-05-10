import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  signal,
} from '@angular/core';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { PrimaryBtnComponent } from '../primary-btn/primary-btn.component';

import { GoogleSheetsService } from '../../../core/services/google-sheets.service';
import { PersonalitiesPhraseService } from '../../../core/services/personalities-phrase.service';
import { CountingClicksService } from '../../../core/services/counting-clicks.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-title-card',
  standalone: true,
  imports: [PrimaryBtnComponent],
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
  @Input() titleText: string = 'Що робить тебе по-справжньому привабливим?';
  @Input() subtitleText: string =
    'Цей тест створений не для того, щоб поставити тебе в рамки, а навпаки — щоб показати твою природну силу, яка вже в тобі є.';

  readonly dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private readonly googleService = inject(GoogleSheetsService);
  private readonly personalitiesPhrasesService = inject(
    PersonalitiesPhraseService
  );
  private countingService = inject(CountingClicksService);
  successRegistration = signal(false);

  private postCountingClicksInSocialLinks(
    socialMedia: 'telegram' | 'instagram' | 'modalButton'
  ) {
    this.countingService
      .postCountingClicksInSocialLinks(socialMedia)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {});
  }
  openDialog(): void {
    this.postCountingClicksInSocialLinks('modalButton');

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
