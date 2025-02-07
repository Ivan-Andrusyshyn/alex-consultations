import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PersonalitiesTypeInformationComponent } from '../../../components/personalities-test/personalities-type-information/personalities-type-information.component';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { PersonalityResult, TypeInformation } from '../../../shared/types/test';
import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { ResultsIndicatorComponent } from '../../../components/personalities-test/results-indicator/results-indicator.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    PersonalitiesTypeInformationComponent,
    SendResultsFormComponent,
    ResultsIndicatorComponent,
    SendFormOnEmailBtnComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private personalitiesService = inject(PersonalitiesTestService);
  private activeRoute = inject(ActivatedRoute);
  private mailerService = inject(MailerService);
  private destroyRef = inject(DestroyRef);

  personInformation$!: Observable<{
    personType: string;
    personInformation: TypeInformation;
  }>;
  scorePercentages$!: Observable<PersonalityResult>;
  isShowSendForm$!: Observable<boolean>;
  isShowFormRespMessage$!: Observable<boolean>;

  ngOnDestroy(): void {
    this.personalitiesService.scorePercentages.next(null);
    sessionStorage.clear();
  }
  ngOnInit(): void {
    this.isShowFormRespMessage$ =
      this.personalitiesService.getIsShowSendFormMessage();
    this.scorePercentages$ =
      this.personalitiesService.getObservableScorePercentages();
    this.isShowSendForm$ = this.personalitiesService.getIsShowSendForm();

    this.activeRoute.params.subscribe((r) => {
      this.personInformation$ = this.personalitiesService
        .getPersonTypeByResults(r['personalitiesName'])
        .pipe(
          map((r) => {
            return {
              personType: r.personType,
              personInformation: r.personInformation,
            };
          })
        );
    });
  }
  sendResultsOnEmail(results: { email: string }) {
    if (results.email) {
      this.mailerService
        .postEmail(results.email)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((r) => {
          this.toggleSendForm();
          this.personalitiesService.isShowSendFormMessage.next(true);
        });
    }
  }
  toggleSendForm() {
    this.personalitiesService.isShowSendForm.next(
      !this.personalitiesService.isShowSendForm.value
    );
  }
}
