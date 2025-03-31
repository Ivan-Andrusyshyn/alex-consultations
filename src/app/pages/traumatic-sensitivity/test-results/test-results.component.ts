import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AsyncPipe,
  NgFor,
  NgIf,
  NgStyle,
  ViewportScroller,
} from '@angular/common';
import {
  catchError,
  filter,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { TypeInformation } from '../../../shared/types/16-personalities';
import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';
import { TraumaticSensitivityService } from '../../../shared/services/traumatic-sensitivity.service';
import {
  PersonalitiesResults,
  TestResult,
} from '../../../shared/types/traumatic-sensitivity';
import { TraumaticResultsIndicatorComponent } from '../../../components/test/traumatic-sensitivity/traumatic-indicator/traumatic-indicator.component';
import { TypeInformationComponent } from '../../../components/test/traumatic-sensitivity/type-information/type-information.component';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { SeoService } from '../../../shared/services/seo.service';
import { AccentBtnComponent } from '../../../components/accent-btn/accent-btn.component';
import { TestListHeroComponent } from '../../../components/test/test-list-hero/test-list-hero.component';
import { SocialLinksComponent } from '../../../components/social-links/social-links.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultationFormComponent } from '../../../components/consultation-form/consultation-form.component';
import { SecondaryBtnComponent } from '../../../components/secondary-btn/secondary-btn.component';

const types: string[] = [
  'C1-E1-T4-W2-B3-F2-R3',
  'C2-E3-T2-W4-B1-F3-R2',
  'C3-E4-T1-W3-B2-F1-R4',
  'C3-E2-T3-W1-B4-F4-R1',
  'C4-E4-T2-W4-B1-F3-R2',
  'C4-E1-T4-W2-B3-F1-R4',
  'C5-E3-T3-W3-B2-F4-R1',
  'C5-E4-T1-W4-B1-F2-R3',
  'C6-E2-T4-W1-B4-F3-R2',
  'C6-E4-T1-W3-B2-F1-R4',
];
@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    SendResultsFormComponent,
    TraumaticResultsIndicatorComponent,
    SendFormOnEmailBtnComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    AccentBtnComponent,
    TypeInformationComponent,
    TestListHeroComponent,
    ConsultationFormComponent,
    SecondaryBtnComponent,
    SocialLinksComponent,
    NgStyle,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private traumaticSensitivityService = inject(TraumaticSensitivityService);
  private mailerService = inject(MailerService);
  private destroyRef = inject(DestroyRef);
  private activeRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  private readonly googleService = inject(GoogleSheetsService);
  private seoService = inject(SeoService);
  private viewportScroller = inject(ViewportScroller);
  private readonly fb = inject(FormBuilder);

  personInformation$!: Observable<{
    personType: string;
    personInformation: TypeInformation;
  }>;
  scorePercentages$!: Observable<TestResult | null>;
  userResults$!: Observable<PersonalitiesResults | null>;
  scoresKeys!: Array<keyof TestResult>;
  isShowSendForm$!: Observable<boolean>;
  sensitivityType$!: Observable<string>;
  successMessage = signal(false);
  successRegistration = signal(false);

  possibleVariablesArray = types;
  testResults$!: Observable<any>;

  sendObject!: any;
  formGroup!: FormGroup;
  ngOnDestroy(): void {
    this.traumaticSensitivityService.scorePercentages.next(null);
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.createForm();
    this.seoService.updateTitle('Результати тесту на травматичну чутливість');
    this.seoService.updateMetaTags(
      'Дізнайся свої результати тесту на травматичну чутливість. Аналізуй рівень емоційної вразливості та зрозумій, як він впливає на твоє життя.',
      'результати тесту, травматична чутливість, емоційна вразливість, психологія, психіка, самопізнання'
    );
    this.activeRoute.params.subscribe((r) => {
      this.testResults$ = this.activeRoute.data.pipe(
        map((data) => {
          const response = data['traumaticSensitivityData'];
          const scrollToTop = data['scrollToTop'];

          if (scrollToTop) {
            this.viewportScroller.scrollToPosition([0, 0]);
          }
          this.sendObject = {
            category: response.results.category,
          };
          return response.results;
        })
      );
    });

    this.scoresKeys = this.traumaticSensitivityService.getScoreKeys();
    this.userResults$ = this.traumaticSensitivityService
      .getObservableSensitivityResults()
      .pipe(
        tap((r) => {
          this.sendObject = { ...r?.results };
        })
      );

    this.isShowSendForm$ = this.traumaticSensitivityService.getIsShowSendForm();
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
    });
  }
  sendResultsOnEmail(results: { email: string }) {
    if (!this.sendObject)
      return console.error(
        'Щоб відправити повідомлення на пошту треба пройти тест!'
      );

    if (results.email) {
      this.mailerService
        .postEmailTraumatic({ email: results.email, ...this.sendObject })
        .pipe(
          tap((r) => {
            this.successMessage.set(true);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((r) => {
          this.toggleSendForm();
        });
    }
  }

  toggleSendForm() {
    this.traumaticSensitivityService.isShowSendForm.next(
      !this.traumaticSensitivityService.isShowSendForm.value
    );
  }
  compare(r: string, b: string): boolean {
    const isMatch = r === b;

    return isMatch;
  }
}
