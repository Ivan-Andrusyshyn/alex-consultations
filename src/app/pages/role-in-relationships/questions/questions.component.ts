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

import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { FormQuestionsComponent } from '../../../components/test/form-questions/form-questions.component';
import { Question, Answer } from '../../../shared/types/16-personalities';
import { SeoService } from '../../../shared/services/seo.service';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { RouteTrackerService } from '../../../shared/services/route-tracker.service';
import { RoleInRelationshipsService } from '../../../shared/services/role-in-relationships.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormQuestionsComponent, TitleCardComponent, AsyncPipe],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnDestroy, OnInit {
  private readonly roleInRelationshipsService = inject(
    RoleInRelationshipsService
  );
  private readonly googleSheetService = inject(GoogleSheetsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private seoService = inject(SeoService);

  private routeTracker = inject(RouteTrackerService);

  readonly imgUrl = 'assets/svg/tests/heart.svg';
  readonly subtitleText =
    'Дізнайся, яка твоя роль у стосунках, і краще зрозумій свої природні схильності у взаєминах.';

  readonly titleText = 'Яка твоя роль у стосунках?';
  answersArray!: Answer[];
  isShowResults$!: Observable<boolean>;
  timestamp = DateTime.now()
    .setZone('Europe/Kyiv')
    .toFormat('yyyy-MM-dd HH:mm:ss');
  currentQuestionNumber: number = 1;
  testQuestions$!: Observable<Question[]>;
  timer: any;
  formGroup: FormGroup = this.fb.group({});
  //

  ngOnInit(): void {
    this.routeTracker.getRoutes();
    this.seoService.updateTitle(
      'Тест: Яка твоя роль у стосунках? - Дай відповідь на питання'
    );
    this.seoService.updateMetaTags(
      'Дізнайся більше про тест "Яка твоя роль у стосунках?", щоб краще зрозуміти свої сильні сторони, стиль спілкування та природні схильності.',
      'тест про стосунки, роль у стосунках, психологічний тест, самопізнання, взаємини, MBTI'
    );

    this.testQuestions$ = this.roleInRelationshipsService.getQuestions().pipe(
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

  private addNextQuestion({
    answers,
    currentQuestionNumber,
  }: {
    answers: Answer[];
    currentQuestionNumber: number;
  }) {
    if (this.formGroup.invalid) {
      this.setSessionStorage(
        'role-in-relationships-answers',
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
      sessionStorage.getItem('role-in-relationships-answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);

    if (parsedAnswers) {
      this.currentQuestionNumber = parsedAnswers.currentQuestion;
      this.formGroup.setValue(parsedAnswers.answers);
    }
  }
  getResults(answers: Answer[]) {
    if (this.formGroup.invalid) return;

    const storage = JSON.parse(
      sessionStorage.getItem('role-in-relationships') || 'null'
    );
    if (storage) return;

    this.roleInRelationshipsService
      .getRoleInRelationshipsCategory({
        answers,
        userInformation: {
          routeTracker: this.routeTracker.getRoutes(),
          referrer: document.referrer ?? '',
          testName: 'role-in-relationships',
          timestamp: this.timestamp ?? '',
          device: this.googleSheetService.getDeviceType(),
        },
      })
      .pipe(
        map((r) => {
          this.setSessionStorage(
            'role-in-relationships-results',
            JSON.stringify({
              categoryName: r.categoryName,
            })
          );
          this.routeTracker.clearRouteMap();

          return r.categoryName;
        }),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((category) => {
        this.handlePersonType(category);
      });
  }

  private handlePersonType(matchResults: string) {
    this.router.navigate([
      'tests',
      'role-in-relationships',
      'details',
      matchResults,
    ]);

    this.formGroup.reset();
    this.roleInRelationshipsService.counterQuestion.next(1);

    const answers = this.formGroup.value;
    this.setSessionStorage(
      'role-in-relationships-answers',
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
