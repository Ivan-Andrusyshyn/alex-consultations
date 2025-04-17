import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { AsyncPipe, NgIf, ViewportScroller } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { PersonalitiesTypeInformationComponent } from '../../../components/test/personalities-test/personalities-type-information/personalities-type-information.component';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { TestResult } from '../../../shared/types/16-personalities';
import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';
import { ResultsIndicatorComponent } from '../../../components/test/personalities-test/results-indicator/results-indicator.component';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { SeoService } from '../../../shared/services/seo.service';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { personalityTypesContent } from '../../../../assets/content/16-personalities/personalityTypes';
import { TestListHeroComponent } from '../../../components/test/test-list-hero/test-list-hero.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultationFormComponent } from '../../../components/consultation-form/consultation-form.component';
import { SecondaryBtnComponent } from '../../../components/secondary-btn/secondary-btn.component';
import { ConsultationBenefitComponent } from '../../../components/consultation-benefit/consultation-benefit.component';
import { TypeResultInformation } from '../../../shared/types/16-personalities-results';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackFormComponent } from '../../../components/feedback-form/feedback-form.component';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    PersonalitiesTypeInformationComponent,
    SendResultsFormComponent,
    ResultsIndicatorComponent,
    SendFormOnEmailBtnComponent,
    AsyncPipe,
    TitleCardComponent,
    TestListHeroComponent,
    NgIf,
    ConsultationFormComponent,
    ConsultationFormComponent,
    SecondaryBtnComponent,
    ConsultationBenefitComponent,
    FeedbackFormComponent,
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
  private viewportScroller = inject(ViewportScroller);
  private readonly fb = inject(FormBuilder);
  formGroup!: FormGroup;

  buttonLabel: string = 'Записатися';
  personInformation$!: Observable<{
    personType: string;
    personInformation: TypeResultInformation;
  }>;
  scorePercentages$!: Observable<TestResult | null>;
  isShowSendForm$!: Observable<boolean>;
  private personalityTypes = personalityTypesContent;
  private _snackBar = inject(MatSnackBar);

  sendObject!: any;
  successMessage = signal(false);
  successRegistration = signal(false);
  imgUrl = '';

  ngOnDestroy(): void {
    this.personalitiesService.scorePercentages.next(null);
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.openSnackBar(
      'Розповім усе про твою любовну сферу безкоштовно — заповнюй форму нижче 😊',
      'Закрити'
    );

    this.createForm();
    // ====>
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
    this.personInformation$ = this.activeRoute.data.pipe(
      map((data) => {
        const response = data['data'];
        const scrollToTop = data['scrollToTop'];

        if (scrollToTop) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }

        this.imgUrl =
          this.personalityTypes.find(
            (type) => type.type === response.personInformation.type
          )?.urlImg ?? '';
        this.buttonLabel = response.personInformation.CTAblock.buttonLabel;

        this.sendObject = {
          personType: response.personType,
          personInformation: response.personInformation,
        } as {
          personType: string;
          personInformation: TypeResultInformation;
        };
        return {
          personType: response.personType,
          personInformation: response.personInformation,
        };
      })
    );
  }

  registration(): void {
    if (this.formGroup.valid) {
      this.googleService
        .postRegistrationInSheet(this.formGroup.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((response) => {
          this.formGroup.reset();
        });
    }
  }
  private openSnackBar(text: string, textBtn: string) {
    const snackBarRef = this._snackBar.open(text, textBtn, {
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'center',
    });

    snackBarRef.onAction().subscribe(() => {});
  }
  private createForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      socialMedia: [
        '',
        [
          Validators.required,
          Validators.pattern(/^@[a-zA-Z0-9_]{4,29}$/),
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      phone: [
        '',
        [
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });
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
