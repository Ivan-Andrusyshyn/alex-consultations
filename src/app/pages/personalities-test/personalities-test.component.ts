import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';

import { TestService } from '../../shared/services/test.service';
import { Question, Answer } from '../../shared/types/test';
import { PersonalitiesTestService } from '../../shared/services/personalities-test.service';

@Component({
  selector: 'app-personalities-test',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './personalities-test.component.html',
  styleUrl: './personalities-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalitiesTestComponent implements OnInit {
  private readonly testService = inject(TestService);
  private readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly fb = inject(FormBuilder);

  personalitiesTest$!: Observable<Question[]>;
  personalityForm!: FormGroup;
  answers!: Answer[];
  scores$!: Observable<{ [key: string]: number }>;
  scoreKeys!: string[];
  isShowResults$!: Observable<boolean>;
  currentQuestionNumber$!: Observable<number>;

  ngOnInit(): void {
    this.currentQuestionNumber$ =
      this.personalitiesService.getObservableCurrentQuestion();
    this.isShowResults$ = this.personalitiesService.getIsShowResult();
    this.scores$ = this.personalitiesService.getObservableScores();
    this.scoreKeys = this.personalitiesService.getScoreKeys();
    this.personalitiesTest$ = this.testService.getPersonalitiesTest().pipe(
      map((r) => {
        console.log(r);
        this.answers = r.answers;
        this.createFormGroup(r.questions);
        return r.questions.slice();
      })
    );
  }

  onSubmit(): void {
    if (this.personalityForm.valid) {
      const allAnswers = this.personalityForm.value;
      const questionList = this.testService.questions;

      const results = this.personalitiesService.calculateMBTIScores(
        allAnswers,
        questionList
      );
      this.personalitiesService.scoresSubject.next({ ...results });
      this.personalitiesService.isShowResults.next(true);
      console.log(results);
    } else {
      console.log('invalid form');
    }
  }

  createFormGroup(questions: Question[]) {
    const formControls: { [key: string]: any } = {};

    questions.slice().forEach((q: Question, i: number) => {
      formControls[(i + 1).toString()] = ['', Validators.required];
    });
    this.personalityForm = this.fb.group(formControls);
  }

  nextQuestion() {
    const currentValue = this.personalitiesService.counterQuestion.value; // Получаем текущее значение

    this.personalitiesService.counterQuestion.next(currentValue + 1);
  }

  previousQuestion() {
    const currentValue = this.personalitiesService.counterQuestion.value; // Получаем текущее значение

    this.personalitiesService.counterQuestion.next(currentValue - 1);
  }

  useColorByResult(score: string): string {
    return this.personalitiesService.setResultsColors(score);
  }
  getResultsDescriptions(score: string): { [key: string]: string } {
    return this.personalitiesService.getResultsDescriptions(score);
  }
  getDescriptionsArray(score: string): { key: string; value: string }[] {
    const descriptions = this.getResultsDescriptions(score);
    return Object.entries(descriptions).map(([key, value]) => ({
      key,
      value,
    }));
  }
}
