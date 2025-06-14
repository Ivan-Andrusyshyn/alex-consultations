import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';
import { catchError, map, Observable, of, timer } from 'rxjs';
import { DateTime } from 'luxon';
import { ActivatedRoute, Router } from '@angular/router';

import { RefreshButtonComponent } from '../../shared/components/refresh-button/refresh-button.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PersonalitiesTestService } from '../../core/services/personalities-test.service';
import { Answer, Question } from '../../shared/models/common-tests';
import { QuestionsStepperComponent } from '../../shared/components/test/questions-stepper/questions-stepper.component';
import { PrimaryBtnComponent } from '../../shared/components/primary-btn/primary-btn.component';
import { RouteTrackerService } from '../../core/services/route-tracker.service';
import { GoogleSheetsService } from '../../core/services/google-sheets.service';
import { SeoService } from '../../core/services/seo.service';
import { QuestionsService } from './questions.service';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import { QuestionWordPipe } from './test-questions.pipe';
import { ModalService } from '../../core/services/modal.service';

interface SnackBar {
  firstSnackBarBtnText: string;
  secondSnackBarBtnText: string;
  secondSnackBar: string;
  firstSnackBar: string;
}

@Component({
  selector: 'app-test-questions',
  standalone: true,
  imports: [
    NgIf,
    RefreshButtonComponent,
    MatTabsModule,
    NgFor,
    ReactiveFormsModule,
    NgClass,
    AsyncPipe,
    QuestionsStepperComponent,
    PrimaryBtnComponent,
    TitleCardComponent,
    QuestionWordPipe,
  ],
  templateUrl: './test-questions.component.html',
  styleUrl: './test-questions.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestQuestionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private routeTracker = inject(RouteTrackerService);
  private activeRoute = inject(ActivatedRoute);
  private googleSheetService = inject(GoogleSheetsService);
  private seoService = inject(SeoService);
  private questionsService = inject(QuestionsService);
  private modalService = inject(ModalService);

  formGroup: FormGroup = this.fb.group({});
  coloredLabel: boolean = true;
  timestamp = DateTime.now()
    .setZone('Europe/Kyiv')
    .toFormat('yyyy-MM-dd HH:mm:ss');
  currentQuestionNumber = signal<number>(1);
  testQuestions$!: Observable<Question[]>;
  private isSnackBarOpened = false;
  TEST_NAME!: string;
  testTitleText = '';
  testSubtitleText = '';
  testQuestionsLength!: number;
  snackBar: SnackBar = {
    firstSnackBarBtnText: 'Йду далі',
    firstSnackBar: 'Ще трохи – і ти дізнаєшся щось, що може тебе здивувати! 😉',
    secondSnackBarBtnText: 'Розкрити себе',
    secondSnackBar: 'Ти молодець. Залишилось зовсім трішки до відкриття себе!',
  };

  isStartTest = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  ngOnInit(): void {
    this.testQuestions$ = this.activeRoute.data.pipe(
      map((response) => {
        const data = response['data'];
        const scrollToTop = response['scrollToTop'];
        this.seoService.updateTitle(data['seo'].title);
        const testName: string = data['testName'];
        this.testTitleText = data['testTitleText'];
        this.testSubtitleText = data['testSubtitleText'];
        this.snackBar = data['snackBar'] || this.snackBar;
        this.TEST_NAME = testName;

        this.seoService.updateMetaTags(
          data['seo'].metaTags[0],
          data['seo'].metaTags[1]
        );
        this.createFormGroup(data['questions']);
        this.testQuestionsLength = data['questions']?.length;
        window.scrollTo(0, 0);

        return data['questions'];
      })
    );

    this.isStartTest.set(
      JSON.parse(sessionStorage.getItem('isStartTest') ?? 'false')
    );
    this.isSnackBarOpened = JSON.parse(
      sessionStorage.getItem('isSnackBarOpened') ?? 'null'
    );
  }

  ngAfterViewInit(): void {
    this.setCurrentAnswers();
  }

  ngOnDestroy(): void {
    this.setSnackBar(false, 'false');
    this.formGroup.reset();
    sessionStorage.setItem('isStartTest', 'false');
  }

  isValid(index: number) {
    return this.formGroup.get(index.toString())?.valid || index == 0;
  }

  private setCurrentAnswers() {
    const stringAnswers =
      sessionStorage.getItem(this.TEST_NAME + '-answers') ?? 'null';
    const parsedAnswers = JSON.parse(stringAnswers);

    if (parsedAnswers) {
      this.currentQuestionNumber.set(parsedAnswers.currentQuestion);
      this.formGroup.setValue(parsedAnswers.answers);
    }
  }
  openSnackBar(text: string, textBtn: string) {
    const snackBarRef = this._snackBar.open(text, textBtn, {
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'center',
    });

    snackBarRef.onAction().subscribe(() => {});
  }

  changeViewQuestion(currentQuNumber: number) {
    this.currentQuestionNumber.set(currentQuNumber);
  }

  isAnswered(questionId: number): boolean | null {
    const control = this.formGroup.get(questionId.toString());
    return control && control.value != null;
  }

  startTestOnClick() {
    sessionStorage.setItem('isStartTest', JSON.stringify(true));

    this.currentQuestionNumber.set(1);
    this.isStartTest.set(true);
  }
  onSubmit() {
    if (this.isSubmitting()) return;
    const answers = this.formGroup.value as Answer[];
    this._snackBar.dismiss();
    this.isSubmitting.set(true);

    const request = {
      answers,
      userInformation: {
        routeTracker: this.routeTracker.getRoutes(),
        referrer: document.referrer ?? '',
        testName: this.TEST_NAME,
        timestamp: this.timestamp ?? '',
        device: this.googleSheetService.getDeviceType(),
      },
    };

    this.questionsService
      .makeRequestByTestName(this.TEST_NAME, request)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.isSubmitting.set(false);
          this.openSnackBar(error.message, 'Закрити');
          return of(error);
        })
      )
      .subscribe((results) => {
        this.handlePersonType(results);
        this.isSubmitting.set(false);
      });
  }

  private openDialog(): void {
    const settings = {
      width: '300px',
      height: '200px',
      isForm: false,
      isConfirm: true,
    };

    this.modalService
      .openModal(settings)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result !== undefined) {
          this.formGroup.reset();

          this.setSnackBar(false, 'false');
          this.cdr.markForCheck();

          this.currentQuestionNumber.set(1);
          sessionStorage.removeItem(this.TEST_NAME + '-results');
          sessionStorage.setItem(
            this.TEST_NAME + '-answers',
            JSON.stringify({
              answers: this.formGroup.value,
              currentQuestion: this.currentQuestionNumber(),
            })
          );
        }
      });
  }
  nextQuestionByClick(questionId: number, value: string) {
    const control = this.formGroup.get(questionId.toString());
    if (control?.value === value) {
      control.setValue(null, { emitEvent: false });
    }
    this.progressPercentage();
    control?.setValue(value, { emitEvent: true });
    const answers = this.formGroup.value;

    if (this.testQuestionsLength === this.currentQuestionNumber()) {
      return;
    }
    this.currentQuestionNumber.update((prev) => prev + 1);

    if (this.formGroup.invalid) {
      sessionStorage.setItem(
        this.TEST_NAME + '-answers',
        JSON.stringify({
          answers,
          currentQuestion: this.currentQuestionNumber(),
        })
      );
    }
  }

  private progressPercentage(): number {
    const totalQuestions = this.testQuestionsLength;
    const answeredQuestions = Object.values(this.formGroup.value).filter(
      (value) => value !== null && value !== undefined && value !== ''
    ).length;
    const progress = totalQuestions
      ? (answeredQuestions / totalQuestions) * 100
      : 0;

    if (!this.isSnackBarOpened && progress > 50 && progress < 80) {
      const text = this.snackBar.firstSnackBar;
      const textBtn = this.snackBar.firstSnackBarBtnText;
      this.openSnackBar(text, textBtn);
      this.setSnackBar(true, 'true');
    } else if (this.isSnackBarOpened && progress > 80) {
      const text = this.snackBar.secondSnackBar;
      const textBtn = this.snackBar.secondSnackBarBtnText;

      this.openSnackBar(text, textBtn);
      this.setSnackBar(false, 'false');
    }

    return progress;
  }
  private createFormGroup(questions: Question[]) {
    const formControls: { [key: string]: any } = {};

    questions.forEach((q: Question, i: number) => {
      formControls[q.id.toString()] = ['', Validators.required];
    });

    this.formGroup = this.fb.group(formControls);
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
    this.currentQuestionNumber.set(questionId);
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

  private handlePersonType(personType: string) {
    this.router.navigate(['tests', this.TEST_NAME, 'details', personType]);

    this.formGroup.reset();
    this.personalitiesService.counterQuestion.next(1);

    const answers = this.formGroup.value;
    sessionStorage.setItem(
      this.TEST_NAME + '-answers',
      JSON.stringify({
        answers,
        currentQuestion: 1,
      })
    );
  }
}
