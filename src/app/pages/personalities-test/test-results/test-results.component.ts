import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  catchError,
  filter,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { PersonalitiesTypeInformationComponent } from '../../../components/test/personalities-test/personalities-type-information/personalities-type-information.component';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import {
  TestResult,
  TypeInformation,
} from '../../../shared/types/16-personalities';
import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';
import { ResultsIndicatorComponent } from '../../../components/test/personalities-test/results-indicator/results-indicator.component';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { PrimaryBtnComponent } from '../../../components/primary-btn/primary-btn.component';
import { SeoService } from '../../../shared/services/seo.service';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { personalityTypesContent } from '../../../../assets/content/16-personalities/personalityTypes';
import { AccentBtnComponent } from '../../../components/accent-btn/accent-btn.component';
import { TestListHeroComponent } from '../../../components/test/test-list-hero/test-list-hero.component';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    PersonalitiesTypeInformationComponent,
    SendResultsFormComponent,
    ResultsIndicatorComponent,
    SendFormOnEmailBtnComponent,
    AccentBtnComponent,
    AsyncPipe,
    TitleCardComponent,
    TestListHeroComponent,
    NgIf,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private personalitiesService = inject(PersonalitiesTestService);
  private activeRoute = inject(ActivatedRoute);
  private mailerService = inject(MailerService);
  private destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);
  private readonly googleService = inject(GoogleSheetsService);
  private seoService = inject(SeoService);

  personInformation$!: Observable<{
    personType: string;
    personInformation: TypeInformation;
  }>;
  scorePercentages$!: Observable<TestResult | null>;
  isShowSendForm$!: Observable<boolean>;
  private personalityTypes = personalityTypesContent;

  sendObject!: any;
  successMessage = signal(false);
  successRegistration = signal(false);
  imgUrl = '';
  ngOnDestroy(): void {
    this.personalitiesService.scorePercentages.next(null);
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.seoService.updateTitle(
      'Результати тесту 16 типів особистості | Дізнайся більше про свій тип'
    );
    this.seoService.updateMetaTags(
      'Дізнайся результати тесту 16 типів особистості та отримай детальний опис свого типу особистості, його сильних і слабких сторін, а також рекомендації для розвитку.',
      'результати тесту, 16 типів особистості, MBTI, психологія, саморозвиток, типи особистості, рекомендації'
    );

    this.scorePercentages$ =
      this.personalitiesService.getObservableScorePercentages();
    this.isShowSendForm$ = this.personalitiesService.getIsShowSendForm();

    this.activeRoute.params.subscribe((r) => {
      this.imgUrl =
        this.personalityTypes.find(
          (type) => type.type === r['personalitiesName']
        )?.urlImg ?? '';
      this.personInformation$ = this.personalitiesService
        .getPersonTypeByResults(r['personalitiesName'])
        .pipe(
          map((r) => {
            this.sendObject = {
              personType: r.personType,
              personInformation: r.personInformation,
            } as {
              personType: string;
              personInformation: TypeInformation;
            };
            return {
              personType: r.personType,
              personInformation: r.personInformation,
            };
          })
        );
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

  sendResultsOnEmail(results: { email: string }) {
    if (results.email) {
      this.mailerService
        .postEmailPersonalities({ email: results.email, ...this.sendObject })
        .pipe(
          tap((r) => this.successMessage.set(true)),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((r) => {
          this.toggleSendForm();
        });
    }
  }
  toggleSendForm() {
    this.personalitiesService.isShowSendForm.next(
      !this.personalitiesService.isShowSendForm.value
    );
  }
}
