import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';

import { Option, TestName } from '../../../../models/tests/common-tests';
import { MainTestNames } from '../../../../../core/utils/testsNames';
//

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
  @Input() isValidForm: boolean = false;
  //
  @Output() answerQuestion = new EventEmitter();
  // Main test names
  mainTestNames = MainTestNames;

  //
  answerQuestionByClick(answer: string, questionsId: string) {
    const value = {
      answer,
      questionsId,
    };

    this.answerQuestion.emit(value);
  }
}
