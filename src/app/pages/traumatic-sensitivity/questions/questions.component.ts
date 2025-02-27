import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Answer, Question } from '../../../shared/types/16-personalities';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { TraumaticSensitivityService } from '../../../shared/services/traumatic-sensitivity.service';
import { FormQuestionsComponent } from '../../../components/test/form-questions/form-questions.component';
import { SeoService } from '../../../shared/services/seo.service';

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
  private seoService = inject(SeoService);

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
    this.seoService.updateTitle('Запитання тесту на травматичну чутливість');
    this.seoService.updateMetaTags(
      'Відповідай на запитання тесту на травматичну чутливість, щоб краще зрозуміти свої реакції на стрес та рівень емоційної вразливості.',
      'тест, травматична чутливість, психологічний тест, емоційна вразливість, запитання, психіка, самопізнання'
    );

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
    if (this.formGroup.invalid) {
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
  getResults(answers: Answer[]) {
    if (this.formGroup.invalid) return;

    const storage = JSON.parse(
      sessionStorage.getItem('traumatic-sensitivity') || 'null'
    );
    if (storage) return;
    this.traumaticSensitivityService
      .getTraumaticSensitivityResults({
        answers,
        userInformation: {
          testName: 'traumatic-sensitivity',
          timestamp: this.timestamp ?? '',
          device: this.googleSheetService.getDeviceType(),
        },
      })
      .pipe(
        map((r) => {
          this.setSessionStorage(
            'traumatic-sensitivity-results',
            JSON.stringify({
              ...r.results,
            })
          );

          this.traumaticSensitivityService.scorePercentages.next(
            r.results.percentages
          );

          this.traumaticSensitivityService.sensitivityResults.next({
            results: r.results,
          });

          return r.results;
        }),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((r) => {
        this.handlePersonType(r.matchResults);
      });
  }

  private handlePersonType(matchResults: string) {
    this.router.navigate([
      'tests',
      'traumatic-sensitivity',
      'details',
      matchResults,
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

  // private scrollToTop(): void {
  //   window.scrollTo({
  //     top: 40,
  //     behavior: 'smooth',
  //   });
  // }

  private setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }
}
