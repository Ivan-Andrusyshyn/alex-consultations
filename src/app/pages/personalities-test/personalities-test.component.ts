import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Answer, TypeInformation } from '../../shared/types/test';
import { PersonalitiesTestService } from '../../shared/services/personalities-test.service';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { SendResultsFormComponent } from '../../components/send-results-form/send-results-form.component';
import { MailerService } from '../../shared/services/mailer.service';
import { PersonalitiesResultsComponent } from '../../components/personalities-test/personalities-results/personalities-results.component';
import { QuestionsComponent } from '../../components/personalities-test/questions/questions.component';
import { RefreshButtonComponent } from '../../components/refresh-button/refresh-button.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { SendFormOnEmailBtnComponent } from '../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { PersonalitiesTypeInformationComponent } from '../../components/personalities-test/personalities-type-information/personalities-type-information.component';

@Component({
  selector: 'app-personalities-test',
  standalone: true,
  imports: [
    ProgressBarComponent,
    SendResultsFormComponent,
    PersonalitiesResultsComponent,
    QuestionsComponent,
    RefreshButtonComponent,
    NgIf,
    AsyncPipe,
    SendFormOnEmailBtnComponent,
    PersonalitiesTypeInformationComponent,
  ],
  templateUrl: './personalities-test.component.html',
  styleUrl: './personalities-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalitiesTestComponent implements OnInit, OnDestroy {
  private readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly mailerService = inject(MailerService);
  private readonly destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);

  answersArray!: Answer[];
  isShowResults$!: Observable<boolean>;
  currentQuestionNumber$!: Observable<number>;
  isShowSendForm$!: Observable<boolean>;
  isShowFormRespMessage$!: Observable<boolean>;
  personInformation$!: Observable<{
    personType: string;
    personInformation: TypeInformation;
  }>;
  timer: any;
  //
  private answers: any = new BehaviorSubject(null);
  answers$: Observable<any> = this.answers.asObservable();
  //
  ngOnInit(): void {
    this.currentQuestionNumber$ =
      this.personalitiesService.getObservableCurrentQuestion();
    this.isShowFormRespMessage$ =
      this.personalitiesService.getIsShowSendFormMessage();

    this.isShowSendForm$ = this.personalitiesService.getIsShowSendForm();
    this.isShowResults$ = this.personalitiesService.getIsShowResult();

    const stringAnswers = sessionStorage.getItem('answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);
    if (parsedAnswers) {
      this.answers.next(parsedAnswers.answers[parsedAnswers.currentQuestion]);
    }

    const scorePercentages = this.personalitiesService.scorePercentages.value;

    this.personInformation$ = this.personalitiesService
      .getPersonTypeByResults(scorePercentages)
      .pipe(
        map((r) => {
          return {
            personType: r.personType,
            personInformation: r.personInformation,
          };
        })
      );
  }
  ngOnDestroy(): void {
    clearTimeout(this.timer);
    this.personalitiesService.isShowResults.next(false);
    this.personalitiesService.scorePercentages.next(null);
    sessionStorage.clear();
  }

  nextQuestion(answers: any) {
    if (window.innerWidth <= 764) {
      this.timer = setTimeout(() => {
        this.addNextQuestion(answers);
      }, 200);
    } else {
      this.addNextQuestion(answers);
    }
  }

  private addNextQuestion(answers: any) {
    const currentValue = this.personalitiesService.counterQuestion.value;

    const increaseValue = currentValue + 1;

    if (this.personalitiesService.personalityForm.valid) {
      this.getResults(answers);
    } else if (
      this.personalitiesService.personalityForm.invalid &&
      increaseValue <= 90
    ) {
      this.scrollToTop();
      this.personalitiesService.counterQuestion.next(increaseValue);

      this.setSessionStorage(
        'answers',
        JSON.stringify({
          answers,
          currentQuestion: currentValue + 1,
        })
      );

      this.answers.next(answers[currentValue]);
    }
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

  refreshTest() {
    this.openDialog();
  }

  toggleSendForm() {
    this.personalitiesService.isShowSendForm.next(
      !this.personalitiesService.isShowSendForm.value
    );
  }
  private getResults(answers: Answer) {
    this.personalitiesService
      .getPersonalitiesResultOfTest({ answers })
      .pipe(
        map((r) => {
          this.setSessionStorage(
            'personality-test',

            JSON.stringify({
              results: r.results.scores,
              scorePercentages: r.results.percentages,
            })
          );
          this.personalitiesService.scorePercentages.next(
            r.results.percentages
          );
          const scorePercentages =
            this.personalitiesService.scorePercentages.value;

          this.personInformation$ = this.personalitiesService
            .getPersonTypeByResults(scorePercentages)
            .pipe(
              map((r) => {
                return {
                  personType: r.personType,
                  personInformation: r.personInformation,
                };
              })
            );
          this.personalitiesService.personalityForm.reset();
          this.personalitiesService.counterQuestion.next(1);
          this.setSessionStorage(
            'answers',
            JSON.stringify({
              answers: this.personalitiesService.personalityForm.value,
              currentQuestion: 1,
            })
          );
          return r.results;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((r) => {
        this.personalitiesService.isShowResults.next(true);
      });
  }
  private scrollToTop(): void {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }
  private openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        contentType: 'confirm',
        title: 'Ви впевнені що хочете почати з початку ?',
        btn: {
          cancel: 'Ні',
          confirm: 'Так',
        },
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result !== undefined) {
          this.personalitiesService.personalityForm.reset();
          this.personalitiesService.counterQuestion.next(1);
          this.scrollToTop();
          this.answers.next([]);

          sessionStorage.removeItem('personality-test');
          this.setSessionStorage(
            'answers',
            JSON.stringify({
              answers: this.personalitiesService.personalityForm.value,
              currentQuestion: 1,
            })
          );
          this.personalitiesService.errors$ = of([]);
        }
      });
  }
  parseIntProc(proc: number) {
    return parseInt(proc.toString());
  }
  private setSessionStorage(key: string, value: any) {
    sessionStorage.setItem('answers', value);
  }

  previousQuestion() {
    const currentValue = this.personalitiesService.counterQuestion.value;

    this.personalitiesService.counterQuestion.next(currentValue - 1);
  }
}
