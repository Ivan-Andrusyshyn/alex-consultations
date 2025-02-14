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
import {
  PersonalitiesResults,
  TestResult,
} from '../../../shared/types/traumatic-sensitivity';
import { TraumaticResultsIndicatorComponent } from '../../../components/test/traumatic-sensitivity/traumatic-indicator/traumatic-indicator.component';

interface Scores {
  scores: TestResult;
  minScoreNumber: string;
  maxScoreNumber: string;
}

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
  sensitivityResults$!: Observable<PersonalitiesResults | null>;
  scoresKeys!: Array<keyof TestResult>;
  isShowSendForm$!: Observable<boolean>;
  isShowFormRespMessage$!: Observable<boolean>;
  sensitivityType$!: Observable<string>;

  possibleVariablesArray: string[] = [
    'C1 - E1 - T4 - W2 - B3 - F2 - R3',
    'C2 - E3 - T2 - W4 - B1 - F3 - R2',
    'C3 - E4 - T1 - W3 - B2 - F1 - R4',
    'C3 - E2 - T3 - W1 - B4 - F4 - R1',
    'C4 - E4 - T2 - W4 - B1 - F3 - R2',
    'C4 - E1 - T4 - W2 - B3 - F1 - R4',
    'C5 - E3 - T3 - W3 - B2 - F4 - R1',
    'C5 - E4 - T1 - W4 - B1 - F2 - R3',
    'C6 - E2 - T4 - W1 - B4 - F3 - R2',
    'C6 - E4 - T1 - W3 - B2 - F1 - R4',
  ];

  ngOnDestroy(): void {
    this.traumaticSensitivityService.scorePercentages.next(null);
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.scoresKeys = this.traumaticSensitivityService.getScoreKeys();
    this.sensitivityResults$ =
      this.traumaticSensitivityService.getObservableSensitivityResults();

    this.isShowFormRespMessage$ =
      this.traumaticSensitivityService.getIsShowSendFormMessage();

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

  compare(r: string, b: string) {
    return r === b;
  }
}
