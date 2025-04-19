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
import { map, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParagraphPipe } from './paragraph.pipe';

import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';
import { ToxicalRelationshipService } from '../../../shared/services/toxical-relationship.service';

import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { SeoService } from '../../../shared/services/seo.service';
import { TestListHeroComponent } from '../../../components/test/test-list-hero/test-list-hero.component';
import { SocialLinksComponent } from '../../../components/social-links/social-links.component';
import { ConsultationFormComponent } from '../../../components/consultation-form/consultation-form.component';
import { SecondaryBtnComponent } from '../../../components/secondary-btn/secondary-btn.component';
import { ConsultationBenefitComponent } from '../../../components/consultation-benefit/consultation-benefit.component';
import { RelationshipResult } from '../../../shared/types/toxical-relationship';
import { FeedbackFormComponent } from '../../../components/feedback-form/feedback-form.component';
import { TestConsultationRegistrationComponent } from '../../../components/test-consultation-registration/test-consultation-registration.component';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    SendResultsFormComponent,
    SendFormOnEmailBtnComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    ParagraphPipe,
    TestListHeroComponent,
    ConsultationFormComponent,
    SecondaryBtnComponent,
    ConsultationBenefitComponent,
    SocialLinksComponent,
    FeedbackFormComponent,
    TestConsultationRegistrationComponent,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private toxicalRelationshipService = inject(ToxicalRelationshipService);
  private mailerService = inject(MailerService);
  private destroyRef = inject(DestroyRef);
  private activeRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  private readonly googleService = inject(GoogleSheetsService);
  private seoService = inject(SeoService);
  private viewportScroller = inject(ViewportScroller);
  successRegistration = signal(false);
  isShowSendForm$!: Observable<boolean>;
  private readonly fb = inject(FormBuilder);
  successMessage = signal(false);

  testResults$!: Observable<RelationshipResult>;

  formGroup!: FormGroup;

  sendObject!: any;
  ngOnDestroy(): void {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.createForm();
    this.seoService.updateTitle(
      'Результати тесту на токсичні відносини з партнером | Оцінка твоїх стосунків'
    );
    this.seoService.updateMetaTags(
      "Дізнайся результати тесту на токсичні відносини з партнером та отримай рекомендації щодо здоров'я твоїх стосунків. Оціни рівень маніпуляцій чи аб’юзу в стосунках.",
      'результати тесту, токсичні відносини, партнер, стосунки, маніпуляції, аб’юз, психологія, рекомендації'
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

    this.isShowSendForm$ = this.toxicalRelationshipService.getIsShowSendForm();
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
  sendResultsOnEmail(results: { email: string }) {
    if (results.email) {
      this.mailerService
        .postEmailToxicalRelationship({
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
    this.toxicalRelationshipService.isShowSendForm.next(
      !this.toxicalRelationshipService.isShowSendForm.value
    );
  }

  compare(r: string, b: string) {
    return r === b;
  }
}
