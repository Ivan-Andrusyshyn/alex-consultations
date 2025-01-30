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
import { map, Observable } from 'rxjs';

import { Question } from '../../../shared/types/test';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  personalitiesService = inject(PersonalitiesTestService);

  personalitiesTest$!: Observable<Question[]>;

  @Input() answers!: any[];
  @Input() currentQuestionNumber: number = 1;
  @Output() nextQues = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();

  ngOnInit(): void {
    this.personalitiesTest$ = this.personalitiesService
      .getPersonalitiesTest()
      .pipe(
        map((r) => {
          this.createFormGroup(r.questions);

          this.setCurrentAnswers();
          this.personalitiesService.amountQuestionsInOneType =
            r.amountQuestionsInOnType;
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
    this.nextQues.emit(answers);
  }

  previousQuestion() {
    this.prevQuestion.emit();
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
