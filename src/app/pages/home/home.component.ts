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
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateTime } from 'luxon';

import { CountingClicksService } from '../../core/services/counting-clicks.service';
import { GoogleSheetsService } from '../../core/services/google-sheets.service';
import { LoadingService } from '../../core/services/loading.service';
import { PersonalitiesPhraseService } from '../../core/services/personalities-phrase.service';
import { SeoService } from '../../core/services/seo.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import {
  PersonalityDayPhrases,
  UsersPhraseSubject,
} from '../../shared/models/personalities-phrases';
import { PrimaryBtnComponent } from '../../shared/components/primary-btn/primary-btn.component';
import { InformationComponent } from '../../shared/components/home/information/information.component';
import { MyHelpComponent } from '../../shared/components/home/my-help/my-help.component';
import { BenefitsComponent } from '../../shared/components/home/benefits/benefits.component';
import { VideoBenefitsComponent } from '../../shared/components/home/video-benefits/video-benefits.component';
import { GoalsComponent } from '../../shared/components/home/goals/goals.component';
import { OurServiceCardsComponent } from '../../shared/components/home/our-service-cards/our-service-cards.component';
import { HeroAnimationComponent } from '../../shared/components/home/hero-animation/hero-animation.component';
import { HeroCardsSliderComponent } from '../../shared/components/hero-cards-slider/hero-cards-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatProgressSpinnerModule,
    PrimaryBtnComponent,
    MyHelpComponent,
    BenefitsComponent,
    InformationComponent,
    VideoBenefitsComponent,
    GoalsComponent,
    OurServiceCardsComponent,
    HeroCardsSliderComponent,
    HeroAnimationComponent,
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
  private countingService = inject(CountingClicksService);
  private readonly loadingService = inject(LoadingService);

  successRegistration = signal(false);
  todayDate!: string;
  dayNumber = new Date().getDate();
  private seoService = inject(SeoService);
  loading$!: Observable<boolean>;

  dayPhrase$!: Observable<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: UsersPhraseSubject;
  }>;

  ngOnInit(): void {
    // this.openDialog();
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
