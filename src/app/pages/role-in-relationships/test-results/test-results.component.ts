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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { SeoService } from '../../../shared/services/seo.service';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { AccentBtnComponent } from '../../../components/accent-btn/accent-btn.component';
import { TestListHeroComponent } from '../../../components/test/test-list-hero/test-list-hero.component';
import { RoleInRelationshipsService } from '../../../shared/services/role-in-relationships.service';
import { RoleInRelationshipsResult } from '../../../shared/types/role-in-relationships';
import { SocialLinksComponent } from '../../../components/social-links/social-links.component';
import { ConsultationFormComponent } from '../../../components/consultation-form/consultation-form.component';
import { SecondaryBtnComponent } from '../../../components/secondary-btn/secondary-btn.component';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    SendResultsFormComponent,
    SendFormOnEmailBtnComponent,
    AccentBtnComponent,
    AsyncPipe,
    TitleCardComponent,
    TestListHeroComponent,
    SocialLinksComponent,
    ConsultationFormComponent,
    SecondaryBtnComponent,
    NgIf,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private readonly roleInRelationshipsService = inject(
    RoleInRelationshipsService
  );
  private mailerService = inject(MailerService);
  private destroyRef = inject(DestroyRef);
  private activeRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  private readonly googleService = inject(GoogleSheetsService);
  private seoService = inject(SeoService);
  private readonly fb = inject(FormBuilder);

  formGroup!: FormGroup;

  successRegistration = signal(false);
  isShowSendForm$!: Observable<boolean>;
  successMessage = signal(false);
  viewportScroller = inject(ViewportScroller);
  testResults$!: Observable<RoleInRelationshipsResult>;

  sendObject!: any;
  ngOnDestroy(): void {
    sessionStorage.clear();
  }
  readonly imgUrl = 'assets/svg/tests/heart.svg';

  ngOnInit(): void {
    this.createForm();
    this.seoService.updateTitle(
      'Результати тесту твоя роль у стосунках?| Дізнайся, власну роль у стосунках.'
    );

    this.seoService.updateMetaTags(
      'Дізнайся більше про тест "Яка твоя роль у стосунках?", щоб краще зрозуміти свої сильні сторони, стиль спілкування та природні схильності.',
      'тест про стосунки, роль у стосунках, психологічний тест, самопізнання, взаємини, MBTI'
    );

    this.activeRoute.params.subscribe((r) => {
      this.testResults$ = this.activeRoute.data.pipe(
        map((data) => {
          const response = data['roleInRelationshipsData'] as {
            results: RoleInRelationshipsResult;
            message: string;
          };
          const scrollToTop = data['scrollToTop'];

          if (scrollToTop) {
            this.viewportScroller.scrollToPosition([0, 0]);
          }
          this.sendObject = {
            category: response.results.type,
          };

          return response.results;
        })
      );
    });

    this.isShowSendForm$ = this.roleInRelationshipsService.getIsShowSendForm();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+380\d{9}$/),
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      interest: ['', Validators.required],
    });
  }
  sendResultsOnEmail(results: { email: string }) {
    if (results.email) {
      this.mailerService
        .postEmailRoleInRelationships({
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
    this.roleInRelationshipsService.isShowSendForm.next(
      !this.roleInRelationshipsService.isShowSendForm.value
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
}
