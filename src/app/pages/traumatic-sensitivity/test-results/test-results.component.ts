import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TypeInformation } from '../../../shared/types/16-personalities';
import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';
import { TraumaticSensitivityService } from '../../../shared/services/traumatic-sensitivity.service';
import { TestResult } from '../../../shared/types/traumatic-sensitivity';
import { TraumaticResultsIndicatorComponent } from '../../../components/test/traumatic-sensitivity/traumatic-indicator/traumatic-indicator.component';

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
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private traumaticSensitivityService = inject(TraumaticSensitivityService);
  private mailerService = inject(MailerService);
  private destroyRef = inject(DestroyRef);

  personInformation$!: Observable<{
    personType: string;
    personInformation: TypeInformation;
  }>;
  scorePercentages$!: Observable<TestResult | null>;
  scores$!: Observable<TestResult | null>;
  scoresKeys!: Array<keyof TestResult>;
  isShowSendForm$!: Observable<boolean>;
  isShowFormRespMessage$!: Observable<boolean>;
  sensitivityType$!: Observable<string>;
  minScoreNumber$!: Observable<string>;
  maxScoreNumber$!: Observable<string>;

  ngOnDestroy(): void {
    this.traumaticSensitivityService.scorePercentages.next(null);
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.scoresKeys = this.traumaticSensitivityService.getScoreKeys();
    this.scores$ = this.traumaticSensitivityService.getObservableScore();
    this.minScoreNumber$ =
      this.traumaticSensitivityService.getObservableMinScoreNumber();
    this.maxScoreNumber$ =
      this.traumaticSensitivityService.getObservableMaxScoreNumber();
    this.sensitivityType$ =
      this.traumaticSensitivityService.getObservableSensitivityType();
    this.isShowFormRespMessage$ =
      this.traumaticSensitivityService.getIsShowSendFormMessage();
    this.scorePercentages$ =
      this.traumaticSensitivityService.getObservableScorePercentages();
    this.isShowSendForm$ = this.traumaticSensitivityService.getIsShowSendForm();
  }

  sendResultsOnEmail(results: { email: string }) {
    if (results.email) {
      this.mailerService
        .postEmail(results.email)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((r) => {
          this.toggleSendForm();
          this.traumaticSensitivityService.isShowSendFormMessage.next(true);
        });
    }
  }

  toggleSendForm() {
    this.traumaticSensitivityService.isShowSendForm.next(
      !this.traumaticSensitivityService.isShowSendForm.value
    );
  }
}
