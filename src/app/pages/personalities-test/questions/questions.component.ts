import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { FormQuestionsComponent } from '../../../components/test/form-questions/form-questions.component';
import { Question, Answer } from '../../../shared/types/16-personalities';
import { SeoService } from '../../../shared/services/seo.service';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { RouteTrackerService } from '../../../shared/services/route-tracker.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormQuestionsComponent, TitleCardComponent, AsyncPipe],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnDestroy, OnInit {
  private readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly googleSheetService = inject(GoogleSheetsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private seoService = inject(SeoService);

  private routeTracker = inject(RouteTrackerService);

  imgUrl = 'assets/imgs/yoga-love.jpg';
  subtitleText =
    'Цей тест допоможе тобі краще зрозуміти свої природні схильності.';
  titleText = 'Тест 16 типів особистості';
  answersArray!: Answer[];
  isShowResults$!: Observable<boolean>;
  timestamp = DateTime.now()
    .setZone('Europe/Kyiv')
    .toFormat('yyyy-MM-dd HH:mm:ss');
  currentQuestionNumber: number = 1;
  personalitiesTest$!: Observable<Question[]>;
  timer: any;
  formGroup: FormGroup = this.fb.group({});
  //

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle(
      'Запитання | 16 типів особистості | vidchuttia'
    );

    this.seoService.updateMetaTags(
      'Відповідай на запитання тесту 16 типів особистості, щоб дізнатися свій унікальний тип.',
      'тест, 16 типів особистості, MBTI, запитання, психологія, саморозвиток'
    );
    this.personalitiesTest$ = this.personalitiesService
      .getPersonalitiesTest()
      .pipe(
        map((r) => {
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
  private createFormGroup(questions: Question[]) {
    const formControls: { [key: string]: any } = {};

    questions.forEach((q: Question, i: number) => {
      formControls[q.id.toString()] = ['', Validators.required];
    });

    this.formGroup = this.fb.group(formControls);
  }
  private setCurrentAnswers() {
    const stringAnswers =
      sessionStorage.getItem('16-personalities-answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);

    if (parsedAnswers) {
      this.currentQuestionNumber = parsedAnswers.currentQuestion;
      this.formGroup.setValue(parsedAnswers.answers);
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
        '16-personalities-answers',
        JSON.stringify({
          answers,
          currentQuestion: currentQuestionNumber,
        })
      );
    }
  }

  getResults(answers: Answer[]) {
    if (this.formGroup.invalid) return;
    const storage = JSON.parse(
      sessionStorage.getItem('16-personalities-results') || 'null'
    );
    if (storage) return;

    this.personalitiesService
      .getPersonalitiesResultOfTest({
        answers,
        userInformation: {
          routeTracker: this.routeTracker.getRoutes(),
          referrer: document.referrer,
          testName: '16-personalities',
          timestamp: this.timestamp ?? '',
          device: this.googleSheetService.getDeviceType(),
        },
      })
      .pipe(
        map((r) => {
          this.setSessionStorage(
            '16-personalities-results',
            JSON.stringify({
              results: r.results.scores,
              scorePercentages: r.results.percentages,
            })
          );
          this.routeTracker.clearRouteMap();

          this.personalitiesService.scorePercentages.next(
            r.results.percentages
          );
          return r.results;
        }),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((results) => {
        console.log(results);
        this.handlePersonType(results.personType);
      });
  }

  private handlePersonType(personType: string) {
    this.router.navigate(['tests', '16-personalities', 'details', personType]);

    this.formGroup.reset();
    this.personalitiesService.counterQuestion.next(1);

    const answers = this.formGroup.value;
    this.setSessionStorage(
      '16-personalities-answers',
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
