import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';

import { Answer } from '../../shared/types/test';
import { PersonalitiesTestService } from '../../shared/services/personalities-test.service';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { SendResultsFormComponent } from '../../components/send-results-form/send-results-form.component';
import { MailerService } from '../../shared/services/mailer.service';
import { PersonalitiesResultsComponent } from '../../components/personalities-test/personalities-results/personalities-results.component';
import { QuestionsComponent } from '../../components/personalities-test/questions/questions.component';
import { RefreshButtonComponent } from '../../components/refresh-button/refresh-button.component';

@Component({
  selector: 'app-personalities-test',
  standalone: true,
  imports: [
    ProgressBarComponent,
    ReactiveFormsModule,
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
export class PersonalitiesTestComponent implements OnInit {
  private readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly mailerService = inject(MailerService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  answersArray!: Answer[];
  scores$!: Observable<{ [key: string]: number }>;
  scoreKeys!: string[];
  isShowResults$!: Observable<boolean>;
  currentQuestionNumber$!: Observable<number>;
  isShowSendForm$!: Observable<boolean>;
  isShowFormRespMessage$!: Observable<boolean>;

  ngOnInit(): void {
    this.currentQuestionNumber$ =
      this.personalitiesService.getObservableCurrentQuestion();
    this.isShowFormRespMessage$ =
      this.personalitiesService.getIsShowSendFormMessage();
    this.isShowSendForm$ = this.personalitiesService.getIsShowSendForm();
    this.isShowResults$ = this.personalitiesService.getIsShowResult();
    this.scores$ = this.personalitiesService.getObservableScores();
    this.scoreKeys = this.personalitiesService.getScoreKeys();
  }

  onSubmit(answers: any): void {
    this.personalitiesService
      .getPersonalitiesResultOfTest({ answers })
      .pipe(
        map((r) => r.results),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((r) => {
        this.personalitiesService.scoresSubject.next(r);
        this.personalitiesService.isShowResults.next(true);
      });
  }

  nextQuestion(answers: any) {
    const currentValue = this.personalitiesService.counterQuestion.value;
    this.personalitiesService.counterQuestion.next(currentValue + 1);
    this.scrollToTop();

    sessionStorage.setItem(
      'answers',
      JSON.stringify({
        answers,
        currentQuestion: currentValue + 1,
      })
    );
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
    this.personalitiesService.personalityForm.reset();
    this.personalitiesService.counterQuestion.next(1);
    this.scrollToTop();
    sessionStorage.setItem(
      'answers',
      JSON.stringify({
        answers: this.personalitiesService.personalityForm.value,
        currentQuestion: 1,
      })
    );
  }

  toggleSendForm() {
    this.personalitiesService.isShowSendForm.next(
      !this.personalitiesService.isShowSendForm.value
    );
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }

  parseIntProc(proc: number) {
    return parseInt(proc.toString());
  }
  previousQuestion() {
    const currentValue = this.personalitiesService.counterQuestion.value;

    this.personalitiesService.counterQuestion.next(currentValue - 1);
  }
}
