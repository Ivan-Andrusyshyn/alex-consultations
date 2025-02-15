import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { Answer, Question } from '../../../shared/types/16-personalities';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { RefreshButtonComponent } from '../../refresh-button/refresh-button.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-form-questions',
  standalone: true,
  imports: [
    NgIf,
    RefreshButtonComponent,
    MatTabsModule,
    NgFor,
    ReactiveFormsModule,
  ],
  templateUrl: './form-questions.component.html',
  styleUrl: './form-questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormQuestionsComponent implements OnInit {
  readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly dialog = inject(MatDialog);

  @Output() nextQues = new EventEmitter();
  @Output() onSubmit = new EventEmitter<Answer[]>();
  @Input() questions!: Question[];
  @Input() formGroup!: FormGroup;
  @Input() currentQuestionNumber: number = 1;
  @Input() currentTestName: string = '';
  ngOnInit(): void {}

  forceChangeControl(questionId: number, value: string) {
    const control = this.formGroup.get(questionId.toString());

    if (control?.value === value) {
      control.setValue(null, { emitEvent: false });
    }

    control?.setValue(value, { emitEvent: true });
    const answers = this.formGroup.value;

    this.currentQuestionNumber += 1;
    this.nextQues.emit({
      answers,
      currentQuestionNumber: this.currentQuestionNumber,
    });
  }

  getSubmit() {
    const answers = this.formGroup.value;
    this.onSubmit.emit(answers);
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        contentType: 'confirm',
        title: 'Ви впевнені що хочете почати з початку ?',
        btn: {
          cancel: 'Ні',
          confirm: 'Так',
        },
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result !== undefined) {
          this.formGroup.reset();
          this.currentQuestionNumber = 0;
          sessionStorage.removeItem(this.currentTestName + '-results');
          sessionStorage.setItem(
            this.currentTestName + '-answers',
            JSON.stringify({
              answers: this.formGroup.value,
              currentQuestion: this.currentQuestionNumber,
            })
          );
          this.cdr.markForCheck();
        }
      });
  }

  refreshTest() {
    this.openDialog();
  }

  navigateToQuestion(errorKey: string) {
    const questionId = parseInt(errorKey, 10);
    this.currentQuestionNumber = questionId;
    window.scrollTo(0, 0);
  }

  parseIntProc(proc: number) {
    return parseInt(proc.toString());
  }

  getInvalidControls(): string[] {
    if (!this.formGroup) {
      return [];
    }

    return Object.keys(this.formGroup.controls).filter(
      (key) => this.formGroup.controls[key].invalid
    );
  }
}
