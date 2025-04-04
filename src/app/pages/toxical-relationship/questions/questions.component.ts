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
import { FormQuestionsComponent } from '../../../components/test/form-questions/form-questions.component';
import { ToxicalRelationshipService } from '../../../shared/services/toxical-relationship.service';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { SeoService } from '../../../shared/services/seo.service';
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
  private readonly googleSheetService = inject(GoogleSheetsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly toxicalRelationshipService = inject(
    ToxicalRelationshipService
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

  traumaticSensitivityTest$!: Observable<Question[]>;
  formGroup: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle(
      'Запитання до тесту на токсичні відносини з партнером | Оціні свої стосунки'
    );
    this.seoService.updateMetaTags(
      'Пройди тест на токсичні відносини з партнером, відповідаючи на запитання, які допоможуть оцінити рівень маніпуляцій та аб’юзу у твоїх стосунках.',
      'тест, запитання до тесту, токсичні відносини, партнер, стосунки, маніпуляції, аб’юз, психологія'
    );

    this.traumaticSensitivityTest$ = this.toxicalRelationshipService
      .getQuestions()
      .pipe(
        map((r) => {
          this.createFormGroup(r.questions);
          this.setCurrentAnswers();

          return r.questions;
        })
      );
  }
  private routeTracker = inject(RouteTrackerService);

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
        'toxical-relationship-answers',
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
      sessionStorage.getItem('toxical-relationship-answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);

    if (parsedAnswers) {
      this.currentQuestionNumber = parsedAnswers.currentQuestion;
      this.formGroup.setValue(parsedAnswers.answers);
    }
  }
  getResults(answers: Answer[]) {
    if (this.formGroup.invalid) return;

    const storage = JSON.parse(
      sessionStorage.getItem('toxical-relationship') || 'null'
    );
    if (storage) return;

    this.toxicalRelationshipService
      .getToxicalRelationshipCategory({
        answers,
        userInformation: {
          referrer: document.referrer ?? '',
          routeTracker: this.routeTracker.getRoutes(),
          testName: 'toxical-relationship',
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
          this.routeTracker.clearRouteMap();

          this.toxicalRelationshipService.toxicalRelationshipResults.next(
            r.categoryName
          );

          return r.categoryName;
        }),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((category) => {
        this.handlePersonType(category);
      });
  }

  private handlePersonType(category: string) {
    this.router.navigate([
      'tests',
      'toxical-relationship',
      'details',
      category,
    ]);

    this.formGroup.reset();
    this.toxicalRelationshipService.counterQuestion.next(1);

    const answers = this.formGroup.value;
    this.setSessionStorage(
      'toxical-relationship-answers',
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
