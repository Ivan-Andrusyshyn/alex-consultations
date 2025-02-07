import { AsyncPipe, NgFor, NgIf } from '@angular/common';
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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { Question } from '../../../shared/types/test';
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
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './form-questions.component.html',
  styleUrl: './form-questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormQuestionsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly dialog = inject(MatDialog);

  @Output() nextQues = new EventEmitter();

  personalitiesTest$!: Observable<Question[]>;
  currentQuestionNumber: number = 1;

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

    this.currentQuestionNumber += 1;
    this.nextQues.emit({
      answers,
      currentQuestionNumber: this.currentQuestionNumber,
    });
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
          this.personalitiesService.personalityForm.reset();
          this.currentQuestionNumber = 0;
          sessionStorage.removeItem('personality-test');
          sessionStorage.setItem(
            'answers',
            JSON.stringify({
              answers: this.personalitiesService.personalityForm.value,
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

  private setCurrentAnswers() {
    const stringAnswers = sessionStorage.getItem('answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);

    if (parsedAnswers) {
      this.currentQuestionNumber = parsedAnswers.currentQuestion;
      this.personalitiesService.personalityForm.setValue(parsedAnswers.answers);
    }
  }

  private createFormGroup(questions: Question[]) {
    const formControls: { [key: string]: any } = {};

    questions.forEach((q: Question, i: number) => {
      formControls[q.id.toString()] = ['', Validators.required];
    });

    this.personalitiesService.personalityForm = this.fb.group(formControls);
  }

  getInvalidControls(): string[] {
    if (!this.personalitiesService.personalityForm) {
      return [];
    }

    return Object.keys(
      this.personalitiesService.personalityForm.controls
    ).filter(
      (key) => this.personalitiesService.personalityForm.controls[key].invalid
    );
  }
}
