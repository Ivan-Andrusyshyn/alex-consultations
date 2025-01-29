import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
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
})
export class QuestionsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  personalitiesService = inject(PersonalitiesTestService);

  personalitiesTest$!: Observable<Question[]>;

  @Input() currentQuestionNumber: number = 1;
  @Output() nextQues = new EventEmitter();
  @Output() submitResults = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();

  ngOnInit(): void {
    this.personalitiesTest$ = this.personalitiesService
      .getPersonalitiesTest()
      .pipe(
        map((r) => {
          this.createFormGroup(r.questions.slice());
          this.setCurrentAnswers();
          this.personalitiesService.amountQuestionsInOnType =
            r.amountQuestionsInOnType;
          return r.questions.slice();
        })
      );
  }

  onSubmit() {
    if (this.personalitiesService.personalityForm.valid) {
      const answers = this.personalitiesService.personalityForm.value;
      this.submitResults.emit(answers);
      this.personalitiesService.personalityForm.reset();
      sessionStorage.setItem(
        'answers',
        JSON.stringify({
          answers: this.personalitiesService.personalityForm.value,
          currentQuestion: 1,
        })
      );
    } else {
      console.error('Invalid form');
    }
  }
  previousQuestion() {
    this.prevQuestion.emit();
  }
  nextQuestion() {
    const answers = this.personalitiesService.personalityForm.value;

    this.nextQues.emit(answers);
  }

  isNextDisabled(currentQuestion: number): boolean {
    return (
      this.personalitiesService.personalityForm.get(currentQuestion.toString())
        ?.invalid ?? false
    );
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
