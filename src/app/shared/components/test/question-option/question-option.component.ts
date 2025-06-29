import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';

import { Option, TestName } from '../../../models/common-tests';

@Component({
  selector: 'app-question-option',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './question-option.component.html',
  styleUrl: './question-option.component.scss',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class QuestionOptionComponent {
  @Input() answer!: Option;
  @Input() testName!: TestName;
  @Input() answerIndex!: number;
  @Input() questionsId!: number;

  @Output() answerQuestion = new EventEmitter();

  answerQuestionByClick(answer: string, questionsId: string) {
    const value = {
      answer,
      questionsId,
    };

    this.answerQuestion.emit(value);
  }
}
