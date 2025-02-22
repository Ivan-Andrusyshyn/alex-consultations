import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
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
import { TypeInformationComponent } from '../../../components/test/traumatic-sensitivity/type-information/type-information.component';

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
    TypeInformationComponent,
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

  personInformation$!: Observable<{
    personType: string;
    personInformation: TypeInformation;
  }>;
  scorePercentages$!: Observable<TestResult | null>;
  userResults$!: Observable<PersonalitiesResults | null>;
  scoresKeys!: Array<keyof TestResult>;
  isShowSendForm$!: Observable<boolean>;
  isShowFormRespMessage$!: Observable<boolean>;
  sensitivityType$!: Observable<string>;

  possibleVariablesArray = types;
  typeInfo$!: Observable<any>;

  sendObject!: any;
  ngOnDestroy(): void {
    this.traumaticSensitivityService.scorePercentages.next(null);
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((r) => {
      this.typeInfo$ = this.typeInfo$ = this.traumaticSensitivityService
        .getEmotionsTypeInfoByResults(r['traumaticSensitivity'])
        .pipe(
          map((info) => {
            return info.information;
          })
        );
    });

    this.scoresKeys = this.traumaticSensitivityService.getScoreKeys();
    this.userResults$ = this.traumaticSensitivityService
      .getObservableSensitivityResults()
      .pipe(
        tap((r) => {
          this.sendObject = { ...r?.results } as PersonalitiesResults;
        })
      );

    this.isShowSendForm$ = this.traumaticSensitivityService.getIsShowSendForm();
  }

  sendResultsOnEmail(results: { email: string }) {
    if (results.email) {
      this.mailerService
        .postEmailTraumatic({ email: results.email, ...this.sendObject })
        .pipe(takeUntilDestroyed(this.destroyRef))
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

  compare(r: string, b: string) {
    return r === b;
  }
}
