import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Answer, Question } from '../../../shared/types/16-personalities';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { TraumaticSensitivityService } from '../../../shared/services/traumatic-sensitivity.service';
import { FormQuestionsComponent } from '../../../components/test/form-questions/form-questions.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormQuestionsComponent, AsyncPipe],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnDestroy, OnInit {
  private readonly googleSheetService = inject(GoogleSheetsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly traumaticSensitivityService = inject(
    TraumaticSensitivityService
  );
  private readonly fb = inject(FormBuilder);

  answersArray!: Answer[];
  isShowResults$!: Observable<boolean>;
  timestamp = DateTime.now()
    .setZone('Europe/Kyiv')
    .toFormat('yyyy-MM-dd HH:mm:ss');
  currentQuestionNumber: number = 1;

  timer: any;
  //
  traumaticSensitivityTest$!: Observable<Question[]>;
  formGroup: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.traumaticSensitivityTest$ = this.traumaticSensitivityService
      .getTraumaticSensitivityTest()
      .pipe(
        map((r) => {
          console.log(r);
          this.createFormGroup(r.questions);
          this.setCurrentAnswers();

          return r.questions;
        })
      );
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
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

  private addNextQuestion({
    answers,
    currentQuestionNumber,
  }: {
    answers: Answer[];
    currentQuestionNumber: number;
  }) {
    if (this.formGroup.valid) {
      this.getResults(answers);
    } else if (this.formGroup.invalid && currentQuestionNumber <= 90) {
      this.scrollToTop();

      this.setSessionStorage(
        'traumatic-sensitivity-answers',
        JSON.stringify({
          answers,
          currentQuestion: currentQuestionNumber,
        })
      );
    }
  }
  private createFormGroup(questions: Question[]) {
    const formControls: { [key: string]: any } = {};

    questions.forEach((q: Question, i: number) => {
      formControls[q.id.toString()] = ['', Validators.required];
    });

    this.formGroup = this.fb.group(formControls);
  }
  private setCurrentAnswers() {
    const stringAnswers =
      sessionStorage.getItem('traumatic-sensitivity-answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);

    if (parsedAnswers) {
      this.currentQuestionNumber = parsedAnswers.currentQuestion;
      this.formGroup.setValue(parsedAnswers.answers);
    }
  }
  private getResults(answers: Answer[]) {
    this.traumaticSensitivityService
      .getPersonalitiesResultOfTest({ answers })
      .pipe(
        map((r) => {
          this.setSessionStorage(
            'traumatic-sensitivity',
            JSON.stringify({
              scores: r.results.scores,
              scorePercentages: r.results.percentages,
              sensitivityRate: r.results.sensitivityType,
              maxScoreNumber: r.results.maxScoreNumber,
              minScoreNumber: r.results.minScoreNumber,
            })
          );

          this.traumaticSensitivityService.scorePercentages.next(
            r.results.percentages
          );
          this.traumaticSensitivityService.sensitivityType.next(
            r.results.sensitivityType
          );
          this.traumaticSensitivityService.scores.next({
            scores: r.results.scores,
            minScoreNumber: r.results.minScoreNumber,
            maxScoreNumber: r.results.maxScoreNumber,
          });

          return r.results;
        }),
        switchMap((r) =>
          this.sendDataToGoogleSheet(r.sensitivityType).pipe(
            map(() => r.percentages)
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((r) => {
        this.handlePersonType(r.E.toString());
      });
  }

  private handlePersonType(personType: string) {
    this.router.navigate([
      'tests',
      'traumatic-sensitivity',
      'details',
      personType,
    ]);

    this.formGroup.reset();
    this.traumaticSensitivityService.counterQuestion.next(1);

    const answers = this.formGroup.value;
    this.setSessionStorage(
      'traumatic-sensitivity-answers',
      JSON.stringify({
        answers,
        currentQuestion: 1,
      })
    );
  }

  private sendDataToGoogleSheet(emotionType: string) {
    return this.googleSheetService
      .postDataInSheet({
        testName: 'traumatic-sensitivity',
        results: emotionType,
        timestamp: this.timestamp ?? '',
        device: this.googleSheetService.getDeviceType(),
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          console.log(err.message);
          return throwError(() => err);
        })
      );
  }
  private scrollToTop(): void {
    window.scrollTo({
      top: 40,
      behavior: 'smooth',
    });
  }

  private setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }
}
