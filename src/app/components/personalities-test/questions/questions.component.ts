import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, of } from 'rxjs';

import { Question } from '../../../shared/types/test';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { ErrorListComponent } from '../error-list/error-list.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [NgIf, ErrorListComponent, NgFor, AsyncPipe, ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly personalitiesService = inject(PersonalitiesTestService);

  personalitiesTest$!: Observable<Question[]>;
  @Input() answers!: any[];
  @Input() currentQuestionNumber: number = 1;
  @Output() nextQues = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();

  // error
  formIsSubmitted: boolean = false;
  questionErrors: { [key: number]: string[] } = {};

  ngOnInit(): void {
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
  forceChangeControl(questionId: number, value: string) {
    const control = this.personalitiesService.personalityForm.get(
      questionId.toString()
    );

    if (control?.value === value) {
      control.setValue(null, { emitEvent: false });
    }

    control?.setValue(value, { emitEvent: true });
    const answers = this.personalitiesService.personalityForm.value;
    if (this.currentQuestionNumber > 89) {
      this.formIsSubmitted = true;
    }
    this.personalitiesService.errors$ = this.getInvalidControls();
    this.nextQues.emit(answers);
  }

  getInvalidControls() {
    const invalidControls = this.personalitiesService.personalityForm.invalid;
    if (invalidControls) {
      const controls = this.personalitiesService.personalityForm.controls;
      const errors = Object.keys(controls).filter(
        (key) => controls[key].invalid
      );

      this.questionErrors = errors.reduce((acc, key) => {
        const questionId = parseInt(key, 10);
        acc[questionId] = acc[questionId] || [];
        acc[questionId].push('Invalid answer');
        return acc;
      }, {} as { [key: number]: string[] });

      return of(errors);
    } else {
      return of(null);
    }
  }

  previousQuestion() {
    this.prevQuestion.emit();
  }
  navigateToQuestion(errorKey: string) {
    const questionId = parseInt(errorKey, 10);
    this.currentQuestionNumber = questionId;
    window.scrollTo(0, 0);
  }

  private setCurrentAnswers() {
    const stringAnswers = sessionStorage.getItem('answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);

    if (parsedAnswers) {
      this.personalitiesService.personalityForm.setValue(parsedAnswers.answers);

      this.personalitiesService.counterQuestion.next(
        parsedAnswers.currentQuestion
      );
    }
  }
  private createFormGroup(questions: Question[]) {
    const formControls: { [key: string]: any } = {};

    questions.forEach((q: Question, i: number) => {
      formControls[q.id.toString()] = ['', Validators.required];
    });

    this.personalitiesService.personalityForm = this.fb.group(formControls);
  }
}
