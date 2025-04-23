import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  filter,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateTime } from 'luxon';

import { ModalComponent } from '../../components/modal/modal.component';
import { TestListHeroComponent } from '../../components/test/test-list-hero/test-list-hero.component';
import { GoogleSheetsService } from '../../shared/services/google-sheets.service';
import { SeoService } from '../../shared/services/seo.service';
import { InfoCardComponent } from '../../components/home/info-card/info-card.component';
import { RouteTrackerService } from '../../shared/services/route-tracker.service';
import { AccentBtnComponent } from '../../components/accent-btn/accent-btn.component';
import { PersonalitiesPhraseService } from '../../shared/services/personalities-phrase.service';

import { LoadingService } from '../../shared/services/loading.service';
import {
  PersonalityDayPhrases,
  UsersPhraseSubject,
} from '../../shared/types/personalities-phrases';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TestListHeroComponent,
    AsyncPipe,
    InfoCardComponent,
    AccentBtnComponent,
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private readonly googleService = inject(GoogleSheetsService);
  private readonly personalitiesPhrasesService = inject(
    PersonalitiesPhraseService
  );

  successRegistration = signal(false);
  todayDate!: string;

  private seoService = inject(SeoService);
  loading$!: Observable<boolean>;
  private readonly loadingService = inject(LoadingService);

  dayPhrase$!: Observable<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: UsersPhraseSubject;
  }>;

  ngOnInit(): void {
    this.todayDate = DateTime.now()
      .setLocale('uk')
      .toLocaleString(DateTime.DATE_FULL);
    this.loading$ = this.loadingService.isLoading();

    this.dayPhrase$ =
      this.personalitiesPhrasesService.getPersonalitiesPhrases();

    this.seoService.updateTitle('Тести для самопізнання та розвитку');
    this.seoService.updateMetaTags(
      'Дізнайся про різноманітні тести для самопізнання, розвитку особистості та оцінки стосунків. Пройди психологічні тести, щоб зрозуміти себе краще і досягти гармонії в житті.',
      'тести,краща версія самого себе, самопізнання, розвиток особистості, психологічні тести, оцінка стосунків, тест на особистість, саморозвиток'
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '290px',
      width: '350px',
      data: {
        isForm: false,
        isShowLinks: true,
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
      .subscribe();
  }
}
