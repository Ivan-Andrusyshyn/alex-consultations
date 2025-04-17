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
import { AsyncPipe, NgFor, NgIf, ViewportScroller } from '@angular/common';
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

import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';

import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { PrimaryBtnComponent } from '../../../components/primary-btn/primary-btn.component';
import { SeoService } from '../../../shared/services/seo.service';
import { AttractivenessService } from '../../../shared/services/attractiveness.service';
import { AccentBtnComponent } from '../../../components/accent-btn/accent-btn.component';
import { TestListHeroComponent } from '../../../components/test/test-list-hero/test-list-hero.component';
import { SocialLinksComponent } from '../../../components/social-links/social-links.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecondaryBtnComponent } from '../../../components/secondary-btn/secondary-btn.component';
import { ConsultationFormComponent } from '../../../components/consultation-form/consultation-form.component';
import { ConsultationBenefitComponent } from '../../../components/consultation-benefit/consultation-benefit.component';
import { FeedbackFormComponent } from '../../../components/feedback-form/feedback-form.component';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    SendResultsFormComponent,
    SendFormOnEmailBtnComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    TestListHeroComponent,
    ConsultationBenefitComponent,
    SecondaryBtnComponent,
    ConsultationFormComponent,
    SocialLinksComponent,
    FeedbackFormComponent,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private attractivenessService = inject(AttractivenessService);
  private mailerService = inject(MailerService);
  private destroyRef = inject(DestroyRef);
  private activeRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  private readonly googleService = inject(GoogleSheetsService);
  private seoService = inject(SeoService);
  private viewportScroller = inject(ViewportScroller);
  private readonly fb = inject(FormBuilder);

  successRegistration = signal(false);
  isShowSendForm$!: Observable<boolean>;
  successMessage = signal(false);

  testResults$!: Observable<any>;

  sendObject!: any;
  formGroup!: FormGroup;

  ngOnDestroy(): void {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.createForm();

    this.seoService.updateTitle(
      'Результати тесту на твою привабливість | Дізнайся, наскільки ти чарівний(а)'
    );

    this.seoService.updateMetaTags(
      'Пройди тест на привабливість і дізнайся, наскільки ти чарівний(а) в очах інших. Оціни свої унікальні риси, харизму та привабливість!',
      'тест на привабливість, оцінка привабливості, харизма, зовнішність, чарівність, краса, самооцінка, впевненість, особистість'
    );
    this.activeRoute.params.subscribe((r) => {
      this.testResults$ = this.activeRoute.data.pipe(
        map((data) => {
          const response = data['data'];
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

    this.isShowSendForm$ = this.attractivenessService.getIsShowSendForm();
  }

  sendResultsOnEmail(results: { email: string }) {
    if (results.email) {
      this.mailerService
        .postEmailAttractiveness({
          email: results.email,
          ...this.sendObject,
        })
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
    this.attractivenessService.isShowSendForm.next(
      !this.attractivenessService.isShowSendForm.value
    );
  }

  compare(r: string, b: string) {
    return r === b;
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
}
