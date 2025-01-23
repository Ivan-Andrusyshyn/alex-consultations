import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';

import { Question, Answer } from '../../shared/types/test';
import { PersonalitiesTestService } from '../../shared/services/personalities-test.service';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-personalities-test',
  standalone: true,
  imports: [
    NgClass,
    ProgressBarComponent,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './personalities-test.component.html',
  styleUrl: './personalities-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalitiesTestComponent implements OnInit {
  private readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly fb = inject(FormBuilder);

  personalitiesTest$!: Observable<Question[]>;
  personalityForm!: FormGroup;
  answersArray!: Answer[];
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
    this.personalitiesTest$ = this.personalitiesService
      .getPersonalitiesTest()
      .pipe(
        map((r) => {
          this.answersArray = r.answers;
          this.createFormGroup(r.questions.slice());
          return r.questions.slice();
        })
      );
  }

  onSubmit(): void {
    if (this.personalityForm.valid) {
      const answers = this.personalityForm.value;
      const questionList = this.personalitiesService.questions;

      const results = this.personalitiesService.calculateMBTIScores(
        answers,
        questionList
      );

      this.personalitiesService.scoresSubject.next(results);
      this.personalitiesService.isShowResults.next(true);
    } else {
      console.error('Invalid form');
    }
  }

  nextQuestion() {
    const currentValue = this.personalitiesService.counterQuestion.value; // Получаем текущее значение
    this.scrollToTop();
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
  parseIntProc(proc: number) {
    return parseInt(proc.toString());
  }

  isNextDisabled(currentQuestion: number): boolean {
    return (
      this.personalityForm.get(currentQuestion.toString())?.invalid ?? false
    );
  }

  private createFormGroup(questions: Question[]) {
    const formControls: { [key: string]: any } = {};

    questions.forEach((q: Question, i: number) => {
      formControls[q.id.toString()] = ['', Validators.required];
    });

    this.personalityForm = this.fb.group(formControls);
  }
  private scrollToTop(): void {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }
}
