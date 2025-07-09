import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, NgIf, ViewportScroller } from '@angular/common';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareButtons } from 'ngx-sharebuttons/buttons';

import { GoogleSheetsService } from '../../core/services/google-sheets.service';
import { TestName, TestResults } from '../../shared/models/common-tests';
import { ConsultationsCardsComponent } from '../../shared/components/test/consultations-cards/consultations-cards.component';
import { ConsultationService } from '../../core/services/consultation.service';
import { BenefitConsultationData } from '../../shared/models/benefit-consultation';
import { ProgressBarComponent } from '../../shared/components/test/progress-bar/progress-bar.component';
import { HeroCardsSliderComponent } from '../../shared/components/hero-cards-slider/hero-cards-slider.component';
import { NotificationService } from '../../core/services/notification.service';
import { StarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
import { ResultService } from './results.service';
import { ResponseData } from './data.interface';
import { CountdownTimerComponent } from '../../shared/components/countdown-timer/countdown-timer.component';
import { SLIDER_KEYS } from '../../shared/models/slider';
import { MainTestNames } from '../../core/utils/testsNames';
import { MonopayService } from '../../core/services/monopay.service';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ConsultationsCardsComponent,
    StarRatingComponent,
    ProgressBarComponent,
    HeroCardsSliderComponent,
    ShareButtons,
    CountdownTimerComponent,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  providers: [ResultService],
})
export class TestResultsComponent implements OnInit, AfterViewInit, OnDestroy {
  private dr = inject(DestroyRef);
  private googleService = inject(GoogleSheetsService);
  readonly dialog = inject(MatDialog);
  private activeRoute = inject(ActivatedRoute);
  private consultationService = inject(ConsultationService);
  private notificationService = inject(NotificationService);
  private viewportScroller = inject(ViewportScroller);
  private resultsService = inject(ResultService);
  private monopayService = inject(MonopayService);
  private router = inject(Router);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  containerElement!: HTMLElement;
  formGroup!: FormGroup;

  successMessage = signal(false);
  TEST_NAME = signal<TestName>(undefined as unknown as TestName);
  showCountDownTimer = signal(false);

  sendObject: any;
  testResults$!: Observable<TestResults & { subCategoryName?: string }>;
  benefitConsultationData$!: Observable<BenefitConsultationData>;
  fullUrl!: string;
  isFirstNotification = false;
  includeShareBtn = ['copy', 'facebook', 'linkedin', 'viber', 'telegram'];
  consultationsSliderKey: SLIDER_KEYS = 'consultations';
  cardsSliderKey: SLIDER_KEYS = 'tests-results';
  mainTestNames = MainTestNames;
  //
  timeInterval: any;
  timeout: any;
  //

  //
  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
    clearTimeout(this.timeout);
    this.timeInterval = null;
  }

  ngAfterViewInit(): void {
    this.timeout = setTimeout(() => {
      this.containerElement = this.scrollContainer.nativeElement;
    }, 1000);
  }

  ngOnInit(): void {
    this.timeInterval = setInterval(() => {
      this.isFirstNotification = false;
    }, 25000);

    this.benefitConsultationData$ = this.consultationService
      .getBenefitConsultation()
      .pipe(map((r) => r.results));

    this.createForm();

    this.testResults$ = this.activeRoute.data.pipe(
      map((data) => {
        //
        const response = data['data'] as ResponseData;
        this.showCountDownTimer.set(true);
        this.fullUrl = window.location.href;

        this.resultsService.updatePageSeo(response);

        const scrollToTop = data['scrollToTop'];
        if (scrollToTop) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }

        const testName = response.testName as TestName;

        //
        this.TEST_NAME.set(testName);

        this.sendObject = {
          category: response.results.type,
        };

        return {
          ...response.results,
          subCategoryName: response.subCategoryCoffee ?? '',
        };
      }),
      switchMap((testResults) =>
        this.monopayService.checkStatus(this.TEST_NAME()).pipe(
          tap((response) => {
            const data = JSON.parse(
              sessionStorage.getItem(this.TEST_NAME + '-isFreeTest') ?? 'null'
            ) as null | boolean;

            if (response.status === 'success' && response.invoiceId) {
              console.log('success');
            } else if (data !== null) {
              this.router.navigate(['/tests']);
            }
          }),
          map(() => testResults)
        )
      )
    );
  }

  showNotification(isFirst: boolean) {
    this.isFirstNotification = isFirst;
    this.notificationService.setNotification(
      'Запишись на безкоштовну консультацію прямо зараз! Тисни кнопку "Безкоштовна консультація".'
    );
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

  getPositionElementBySubType(type: string): number | string {
    return this.resultsService.getSubCategoryName(type);
  }

  getImgUrl(type: string): string {
    const base_url = '/assets/new/core/tests/';
    return base_url + this.TEST_NAME() + '/results' + '/' + type + '.svg';
  }
  private createForm() {
    this.formGroup = this.resultsService.createForm();
  }
}
