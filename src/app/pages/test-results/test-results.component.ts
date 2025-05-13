import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf, ViewportScroller } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MailerService } from '../../core/services/mailer.service';
import { GoogleSheetsService } from '../../core/services/google-sheets.service';
import { SeoService } from '../../core/services/seo.service';
import { TestResults } from '../../shared/models/common-tests';
import { ConsultationsCardsComponent } from '../../shared/components/test/consultations-cards/consultations-cards.component';
import { ExpandablePanelComponent } from '../../shared/components/expandable-panel/expandable-panel.component';
import { ConsultationService } from '../../core/services/consultation.service';
import { BenefitConsultationData } from '../../shared/models/benefit-consultation';
import { HeroCardsSliderComponent } from '../../shared/components/home/hero-cards-slider/hero-cards-slider.component';
import { testResultExample } from './dev';
import { ProgressBarComponent } from '../../shared/components/test/progress-bar/progress-bar.component';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ConsultationsCardsComponent,
    ExpandablePanelComponent,
    ProgressBarComponent,
    HeroCardsSliderComponent,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private mailerService = inject(MailerService);
  private dr = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private googleService = inject(GoogleSheetsService);
  readonly dialog = inject(MatDialog);
  private seoService = inject(SeoService);
  private activeRoute = inject(ActivatedRoute);
  private consultationService = inject(ConsultationService);
  scrollContainerNumber!: number;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  formGroup!: FormGroup;
  successMessage = signal(false);
  isShowSendForm = signal(false);
  sendObject: any;
  viewportScroller = inject(ViewportScroller);
  testResults$!: Observable<TestResults>;
  benefitConsultationData$!: Observable<BenefitConsultationData>;
  example: Partial<TestResults> = testResultExample;
  TEST_NAME = signal<string>('');

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    const element = this.scrollContainer.nativeElement.offsetTop;

    this.scrollContainerNumber = element;
  }

  ngOnInit(): void {
    this.benefitConsultationData$ = this.consultationService
      .getBenefitConsultation()
      .pipe(map((r) => r.results));

    this.createForm();

    this.testResults$ = this.activeRoute.data.pipe(
      map((data) => {
        const response = data['data'] as {
          results: TestResults;
          message: string;
          testName: string;
          seo: {
            title: string;
            metaTags: Array<string>;
          };
        };

        const scrollToTop = data['scrollToTop'];
        this.seoService.updateTitle(response.seo.title);

        this.seoService.updateMetaTags(
          response.seo.metaTags[0],
          response.seo.metaTags[1]
        );
        if (scrollToTop) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
        const testName: string = response.testName;

        this.TEST_NAME.set(testName);

        this.sendObject = {
          category: response.results.type,
        };

        return response.results;
      })
    );
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
          takeUntilDestroyed(this.dr)
        )
        .subscribe((r) => {
          this.toggleSendForm();
        });
    }
  }

  toggleSendForm() {
    this.isShowSendForm.update((prev) => !prev);
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
  registration(): void {
    if (this.formGroup.valid) {
      this.googleService
        .postRegistrationInSheet(this.formGroup.value)
        .pipe(takeUntilDestroyed(this.dr))
        .subscribe((response) => {
          this.formGroup.reset();
        });
    }
  }
}
