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
import { ModalService } from '../../../core/services/modal.service';
import { NotificationService } from '../../../core/services/notification.service';

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

  private destroyRef = inject(DestroyRef);
  private readonly googleService = inject(GoogleSheetsService);
  private readonly personalitiesPhrasesService = inject(
    PersonalitiesPhraseService
  );
  private countingService = inject(CountingClicksService);
  private modalService = inject(ModalService);
  private notificationService = inject(NotificationService);

  successRegistration = signal(false);

  private postCountingClicksInSocialLinks(
    socialMedia: 'telegram' | 'instagram' | 'modalButton'
  ) {
    this.countingService
      .postCountingClicksInSocialLinks(socialMedia)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {});
  }
  private showSuccess() {
    this.notificationService.setNotification(
      '✅ Дякуємо! Вас успішно записано на безкоштовну консультацію. Ми скоро з вами зв’яжемося!'
    );
  }
  openDialog(): void {
    this.modalService
      .openModal({
        width: '90vw',
        isForm: true,
        isConfirm: false,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((r) => !!r),
        switchMap((r) =>
          this.googleService.postRegistrationInSheet(r).pipe(
            tap(() => this.showSuccess()),
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
