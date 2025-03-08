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

import { Answer } from '../../../shared/types/16-personalities';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { FormQuestionsComponent } from '../../../components/test/form-questions/form-questions.component';
import { SeoService } from '../../../shared/services/seo.service';
import { AttractivenessService } from '../../../shared/services/attractiveness.service';
import { Question } from '../../../shared/types/attractiveness';

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
  private readonly attractivenessService = inject(AttractivenessService);
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

  attractivenessService$!: Observable<Question[]>;
  formGroup: FormGroup = this.fb.group({});
  ngOnInit(): void {
    this.seoService.updateTitle('Запитання тесту на привабливість');

    this.seoService.updateMetaTags(
      'Відповідай на запитання тесту на привабливість, щоб дізнатися, як тебе сприймають інші. Оціни свою харизму, впевненість і чарівність!',
      'тест, привабливість, оцінка привабливості, зовнішність, харизма, впевненість, чарівність, психологічний тест, самопізнання'
    );

    this.attractivenessService$ = this.attractivenessService
      .getQuestions()
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
        'attractiveness-answers',
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
      sessionStorage.getItem('attractiveness-answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);

    if (parsedAnswers) {
      this.currentQuestionNumber = parsedAnswers.currentQuestion;
      this.formGroup.setValue(parsedAnswers.answers);
    }
  }
  getResults(answers: Answer[]) {
    if (this.formGroup.invalid) return;

    const storage = JSON.parse(
      sessionStorage.getItem('attractiveness') || 'null'
    );
    if (storage) return;

    this.attractivenessService
      .getAttractivenessCategory({
        answers,
        userInformation: {
          referrer: document.referrer,
          testName: 'attractiveness',
          timestamp: this.timestamp ?? '',
          device: this.googleSheetService.getDeviceType(),
        },
      })
      .pipe(
        map((r) => {
          this.setSessionStorage(
            'toxical-relationship-results',
            JSON.stringify({
              categoryName: r.categoryName,
            })
          );

          return r.categoryName;
        }),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((category) => {
        this.handlePersonType(category);
      });
  }

  private handlePersonType(matchResults: string) {
    this.router.navigate(['tests', 'attractiveness', 'details', matchResults]);

    this.formGroup.reset();
    this.attractivenessService.counterQuestion.next(1);

    const answers = this.formGroup.value;
    this.setSessionStorage(
      'attractiveness-answers',
      JSON.stringify({
        answers,
        currentQuestion: 1,
      })
    );
  }

  private setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }
}
