import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { Question } from '../../../models/common-tests';

@Component({
  selector: 'app-questions-stepper',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './questions-stepper.component.html',
  styleUrl: './questions-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsStepperComponent {
  @Input() questions!: Question[];
  @Input() formGroup!: FormGroup;
  @Input() currentQuestionNumber = 1;
  @Output() changeViewQuestion = new EventEmitter();

  isChooseQuestion = signal(false);

  @ViewChild('stepperContainer') stepperContainer!: ElementRef;

  changeQuestion(currentQuNumber: number) {
    this.isChooseQuestion.set(true);
    this.changeViewQuestion.emit(currentQuNumber);
  }

  isValid(indexQ: number) {
    return this.formGroup.get(indexQ.toString())?.valid || indexQ == 0;
  }
  isXsGap(): boolean {
    return this.questions.length > 24 ? true : false;
  }
  isLgGap(): boolean {
    return this.questions.length <= 12 ? true : false;
  }
  isMdGap(): boolean {
    return this.questions.length > 12 && this.questions.length <= 24
      ? true
      : false;
  }
}
