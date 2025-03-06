import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Answer, Question } from '../../../shared/types/16-personalities';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { RefreshButtonComponent } from '../../refresh-button/refresh-button.component';
import { ModalComponent } from '../../modal/modal.component';
import { SecondaryBtnComponent } from '../../secondary-btn/secondary-btn.component';
import { QuestionWordPipe } from './questions.pipe';

@Component({
  selector: 'app-form-questions',
  standalone: true,
  imports: [
    NgIf,
    RefreshButtonComponent,
    MatTabsModule,
    NgFor,
    ReactiveFormsModule,
    SecondaryBtnComponent,
    QuestionWordPipe,
    NgClass,
  ],
  templateUrl: './form-questions.component.html',
  styleUrl: './form-questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormQuestionsComponent implements OnInit, OnDestroy {
  readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  @Output() nextQues = new EventEmitter();
  @Output() onSubmit = new EventEmitter<Answer[]>();
  @Input() questions!: Question[];
  @Input() formGroup!: FormGroup;
  @Input() currentQuestionNumber: number = 1;
  @Input() currentTestName: string = '';
  @Input() coloredLabel: boolean = true;

  private isSnackBarOpened = false;

  colorProgressBar = signal('linear-gradient(90deg, #ff7eb3, #ff758c)');

  ngOnInit(): void {
    this.isSnackBarOpened = JSON.parse(
      sessionStorage.getItem('isSnackBarOpened') ?? 'null'
    );
    if (this.isSnackBarOpened) {
      this.colorProgressBar.set('linear-gradient(90deg, #11998e, #38ef7d)');
    }
  }
  ngOnDestroy(): void {
    sessionStorage.setItem('isSnackBarOpened', 'false');
  }
  openSnackBar() {
    const text = 'Ще трохи – і ти дізнаєшся щось, що може тебе здивувати! 😉';
    const textBtn = 'Йду далі';

    const snackBarRef = this._snackBar.open(text, textBtn, {
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'center',
    });

    snackBarRef.onAction().subscribe(() => {
      this.colorProgressBar.set('linear-gradient(90deg, #11998e, #38ef7d)');
    });
  }

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
  isAnswered(questionId: number): boolean | null {
    const control = this.formGroup.get(questionId.toString());
    return control && control.value != null;
  }
  get progressPercentage(): number {
    const totalQuestions = this.questions.length;
    const answeredQuestions = Object.values(this.formGroup.value).filter(
      (value) => value !== null && value !== undefined && value !== ''
    ).length;
    const progress = totalQuestions
      ? (answeredQuestions / totalQuestions) * 100
      : 0;

    const halfQuestions = Math.ceil(totalQuestions / 2);

    if (
      !this.isSnackBarOpened &&
      progress > 50 &&
      answeredQuestions >= halfQuestions
    ) {
      this.openSnackBar();
      this.isSnackBarOpened = true;
      sessionStorage.setItem('isSnackBarOpened', 'true');
    }

    return progress;
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
          sessionStorage.setItem('isSnackBarOpened', 'false');
          this.colorProgressBar.set('linear-gradient(90deg, #ff7eb3, #ff758c)');
          this.isSnackBarOpened = false;
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
