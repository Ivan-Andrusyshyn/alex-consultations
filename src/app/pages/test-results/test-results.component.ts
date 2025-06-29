import {
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
import { map, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
export class TestResultsComponent implements OnInit, OnDestroy {
  private dr = inject(DestroyRef);
  private googleService = inject(GoogleSheetsService);
  readonly dialog = inject(MatDialog);
  private activeRoute = inject(ActivatedRoute);
  private consultationService = inject(ConsultationService);
  private notificationService = inject(NotificationService);
  private viewportScroller = inject(ViewportScroller);
  private resultsService = inject(ResultService);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  containerElement!: HTMLElement;
  formGroup!: FormGroup;

  successMessage = signal(false);
  TEST_NAME = signal<TestName | ''>('');
  showCountDownTimer = signal(false);

  sendObject: any;
  testResults$!: Observable<TestResults & { subCategoryName?: string }>;
  benefitConsultationData$!: Observable<BenefitConsultationData>;
  fullUrl!: string;
  timeInterval: any;
  isFirstNotification = false;
  includeShareBtn = ['copy', 'facebook', 'linkedin', 'viber', 'telegram'];
  consultationsSliderKey: SLIDER_KEYS = 'consultations';
  cardsSliderKey: SLIDER_KEYS = 'tests-results';

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
    this.timeInterval = null;
  }

  ngAfterViewInit(): void {
    this.containerElement = this.scrollContainer.nativeElement;
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
        const response = data['data'] as ResponseData;
        this.showCountDownTimer.set(true);
        this.fullUrl = window.location.href;

        this.resultsService.updatePageSeo(response);

        const scrollToTop = data['scrollToTop'];
        if (scrollToTop) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }

        const testName = response.testName as TestName;

        this.TEST_NAME.set(testName);

        this.sendObject = {
          category: response.results.type,
        };

        return {
          ...response.results,
          subCategoryName: response.subCategoryCoffee ?? '',
        };
      })
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
