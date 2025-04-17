import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
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

import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { RefreshButtonComponent } from '../../refresh-button/refresh-button.component';
import { ModalComponent } from '../../modal/modal.component';
import { SecondaryBtnComponent } from '../../secondary-btn/secondary-btn.component';
import { QuestionWordPipe } from './questions.pipe';
import { Answer, Question } from '../../../shared/types/common-tests';

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
    DecimalPipe,
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
  isStartTest = signal(false);

  ngOnInit(): void {
    this.isStartTest.set(
      JSON.parse(sessionStorage.getItem('isStartTest') ?? 'false')
    );

    this.isSnackBarOpened = JSON.parse(
      sessionStorage.getItem('isSnackBarOpened') ?? 'null'
    );

    if (this.isSnackBarOpened) {
      this.colorProgressBar.set('linear-gradient(90deg, #11998e, #38ef7d)');
    }
  }
  ngOnDestroy(): void {
    this.setSnackBar(false, 'false');
    sessionStorage.setItem('isStartTest', 'false');
  }

  openSnackBar(text: string, textBtn: string) {
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

    if (!this.isSnackBarOpened && progress > 50 && progress < 80) {
      const text = 'Ще трохи – і ти дізнаєшся щось, що може тебе здивувати! 😉';
      const textBtn = 'Йду далі';
      this.openSnackBar(text, textBtn);
      this.setSnackBar(true, 'true');
    } else if (this.isSnackBarOpened && progress > 80) {
      const text = 'Ти молодець. Залишилось зовсім трішки до відкриття себе!';
      const textBtn = 'Розкрити себе';
      this.openSnackBar(text, textBtn);
      this.setSnackBar(false, 'false');
    }

    return progress;
  }
  startTestOnClick() {
    sessionStorage.setItem('isStartTest', JSON.stringify(true));
    this.currentQuestionNumber = 0;
    this.isStartTest.set(true);
  }

  getSubmit() {
    const answers = this.formGroup.value;
    this._snackBar.dismiss();
    this.onSubmit.emit(answers);
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '200px',
      width: '300px',
      data: {
        contentType: 'confirm',
        isForm: false,
        isConfirmForm: true,
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

          this.setSnackBar(false, 'false');

          this.colorProgressBar.set('linear-gradient(90deg, #ff7eb3, #ff758c)');
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
  private setSnackBar(isSnack: boolean, storage: string) {
    this.isSnackBarOpened = isSnack;
    sessionStorage.setItem('isSnackBarOpened', storage);
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
