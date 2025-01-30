import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Answer } from '../../shared/types/test';
import { PersonalitiesTestService } from '../../shared/services/personalities-test.service';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { SendResultsFormComponent } from '../../components/send-results-form/send-results-form.component';
import { MailerService } from '../../shared/services/mailer.service';
import { PersonalitiesResultsComponent } from '../../components/personalities-test/personalities-results/personalities-results.component';
import { QuestionsComponent } from '../../components/personalities-test/questions/questions.component';
import { RefreshButtonComponent } from '../../components/refresh-button/refresh-button.component';
import { ModalComponent } from '../../components/modal/modal.component';

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
  scores$!: Observable<{ [key: string]: number }>;
  scoreKeys!: string[];
  isShowResults$!: Observable<boolean>;
  currentQuestionNumber$!: Observable<number>;
  isShowSendForm$!: Observable<boolean>;
  isShowFormRespMessage$!: Observable<boolean>;

  //
  answers: any = new BehaviorSubject(null);
  answers$: Observable<any> = this.answers.asObservable();
  timeout: any;
  //
  ngOnInit(): void {
    this.currentQuestionNumber$ =
      this.personalitiesService.getObservableCurrentQuestion();
    this.isShowFormRespMessage$ =
      this.personalitiesService.getIsShowSendFormMessage();

    this.isShowSendForm$ = this.personalitiesService.getIsShowSendForm();
    this.isShowResults$ = this.personalitiesService.getIsShowResult();

    this.scores$ = this.personalitiesService.getObservableScores();
    this.scoreKeys = this.personalitiesService.getScoreKeys();

    const stringAnswers = sessionStorage.getItem('answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);
    if (parsedAnswers) {
      this.answers.next(parsedAnswers.answers[parsedAnswers.currentQuestion]);
    }
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeout);
    this.personalitiesService.isShowResults.next(false);
    sessionStorage.clear();
  }

  nextQuestion(answers: any) {
    const currentValue = this.personalitiesService.counterQuestion.value;

    const increaseValue = currentValue + 1;

    this.timeout = setTimeout(() => {
      if (increaseValue > 90) {
        this.getResults(answers);
      } else {
        this.scrollToTop();
        this.personalitiesService.counterQuestion.next(increaseValue);

        sessionStorage.setItem(
          'answers',
          JSON.stringify({
            answers,
            currentQuestion: currentValue + 1,
          })
        );

        this.answers.next(answers[currentValue]);
      }
    }, 500);
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
          sessionStorage.setItem(
            'personality-test',
            JSON.stringify({
              results: r.results,
              amountQuestionsInOneType:
                this.personalitiesService.amountQuestionsInOneType,
            })
          );
          this.personalitiesService.personalityForm.reset();

          sessionStorage.setItem(
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
        this.personalitiesService.scoresSubject.next(r);
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
          sessionStorage.setItem(
            'answers',
            JSON.stringify({
              answers: this.personalitiesService.personalityForm.value,
              currentQuestion: 1,
            })
          );
        }
      });
  }
  parseIntProc(proc: number) {
    return parseInt(proc.toString());
  }
  previousQuestion() {
    this.timeout = setTimeout(() => {
      const currentValue = this.personalitiesService.counterQuestion.value;

      this.personalitiesService.counterQuestion.next(currentValue - 1);
    }, 500);
  }
}
