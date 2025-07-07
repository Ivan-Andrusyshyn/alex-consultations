import { AsyncPipe, NgFor, NgIf } from '@angular/common';
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
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { RefreshButtonComponent } from '../../shared/components/refresh-button/refresh-button.component';
import { BeYourselfTestService } from '../../core/services/be-yourself.service';
import { Answer, Question, TestName } from '../../shared/models/common-tests';
import { QuestionsStepperComponent } from '../../shared/components/test/questions-stepper/questions-stepper.component';
import { PrimaryBtnComponent } from '../../shared/components/primary-btn/primary-btn.component';
import { SeoService } from '../../core/services/seo.service';
import { QuestionsService } from './questions.service';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import { QuestionWordPipe } from './test-questions.pipe';
import { ModalService } from '../../core/services/modal.service';
import { fadeInAnimation } from './fadeIn-animation';
import { SnackBar } from './snackBar.interface';
import { QuestionOptionComponent } from '../../shared/components/test/question-option/question-option.component';
import { MonopayService } from '../../core/services/monopay.service';
import { dataDevPayment } from './dev-payment';

@Component({
  selector: 'app-test-questions',
  standalone: true,
  imports: [
    NgIf,
    RefreshButtonComponent,
    MatTabsModule,
    NgFor,
    ReactiveFormsModule,
    AsyncPipe,
    QuestionsStepperComponent,
    PrimaryBtnComponent,
    TitleCardComponent,
    QuestionWordPipe,
    QuestionOptionComponent,
  ],
  templateUrl: './test-questions.component.html',
  styleUrl: './test-questions.component.scss',
  animations: [fadeInAnimation],
  providers: [QuestionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestQuestionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  readonly beYourselfService = inject(BeYourselfTestService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  private activeRoute = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private questionsService = inject(QuestionsService);
  private modalService = inject(ModalService);

  private monopayService = inject(MonopayService);

  //
  formGroup: FormGroup = this.fb.group({});
  coloredLabel: boolean = true;

  private isSnackBarOpened = false;

  testQuestions$!: Observable<Question[]>;
  TEST_NAME!: TestName;
  testTitleText = '';
  testSubtitleText = '';
  testQuestionsLength!: number;
  snackBar: SnackBar = {
    firstSnackBarBtnText: 'Йду далі',
    firstSnackBar: 'Ще трохи – і ти дізнаєшся щось, що може тебе здивувати! 😉',
    secondSnackBarBtnText: 'Розкрити себе',
    secondSnackBar: 'Ти молодець. Залишилось зовсім трішки до відкриття себе!',
  };
  //
  accessCurrentTest = signal(false);
  //

  isStartTest = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  currentQuestionNumber = signal<number>(1);
  showTextBoard = signal(true);
  testsInstruction!: {
    instructionsTitle: string;
    testTitle: string;
    steps: string[];
  };
  isSuccessPayedTest = signal<boolean>(false);
  // Payment
  redirectUrl = window.location.href;
  testResultsInRouteKey!: string;

  ngOnInit(): void {
    this.testQuestions$ = this.activeRoute.data.pipe(
      map((response) => {
        const data = response['data'];
        const scrollToTop = response['scrollToTop'];
        this.seoService.updateTitle(data['seo'].title);
        const testName: TestName = data['testName'];
        this.testTitleText = data['testTitleText'];
        this.testSubtitleText = data['testSubtitleText'];

        this.testsInstruction = data['testsInstruction'];

        this.snackBar = data['snackBar'] || this.snackBar;
        //
        this.TEST_NAME = testName;
        this.testResultsInRouteKey = this.TEST_NAME + '-results-in-route';

        //

        this.seoService.updateMetaTags(
          data['seo'].metaTags[0],
          data['seo'].metaTags[1]
        );
        const formControls = this.questionsService.createFormGroup(
          data['questions']
        );
        this.formGroup = this.fb.group(formControls);

        this.testQuestionsLength = data['questions']?.length;
        window.scrollTo(0, 0);

        this.setStorageBoardValue();
        return data['questions'];
      }),
      switchMap((questions) => {
        return this.monopayService.checkStatus(this.TEST_NAME)?.pipe(
          tap((response) => {
            this.isSuccessPayedTest.set(response.status === 'success');
            if (
              response.status === 'success' &&
              response.invoiceId &&
              this.formGroup.valid
            ) {
              const results =
                sessionStorage.getItem(this.testResultsInRouteKey) ?? '';

              this.handlePersonType(results);
              //
              sessionStorage.removeItem(this.testResultsInRouteKey);
            }
          }),
          map(() => questions),
          catchError((error: any) => {
            this.accessCurrentTest.set(false);
            return of(error.message || 'Error checking payment status');
          })
        );
      })
    );

    //
    this.isStartTest.set(
      JSON.parse(sessionStorage.getItem('isStartTest') ?? 'false')
    );
    this.isSnackBarOpened = JSON.parse(
      sessionStorage.getItem('isSnackBarOpened') ?? 'null'
    );
  }
  // ==============payment
  createMonoPaymentByClick() {
    dataDevPayment.merchantPaymInfo.comment = this.TEST_NAME;
    dataDevPayment.redirectUrl = window.location.href;
    const answers = this.formGroup.value as Answer[];

    const newRequest = this.questionsService.createNewRequestObject(
      this.TEST_NAME,
      answers
    );
    this.questionsService
      .makeRequestByTestName(this.TEST_NAME, newRequest)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((results) => {
          sessionStorage.setItem(this.testResultsInRouteKey, results);
        }),
        switchMap(() => this.monopayService.createPayment(dataDevPayment))
      )
      .subscribe((response) => {
        const currentUrl = window.location.pathname;
        window.history.pushState({}, '', currentUrl);
        window.location.href = response.pageUrl;
      });
  }

  //

  // ============================
  ngAfterViewInit(): void {
    this.setCurrentAnswers();
  }

  ngOnDestroy(): void {
    this.setSnackBar(false, 'false');

    this.formGroup.reset();
    sessionStorage.setItem(this.TEST_NAME + '-showQuestions', 'true');
    sessionStorage.setItem('isStartTest', 'false');
  }

  isValid(index: number) {
    return this.formGroup.get(index.toString())?.valid || index == 0;
  }

  private setCurrentAnswers() {
    const parsedAnswers = this.questionsService.parseAnswers(this.TEST_NAME);

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
    const answers = this.formGroup.value as Answer[];
    this._snackBar.dismiss();
    this.isSubmitting.set(true);

    const newRequest = this.questionsService.createNewRequestObject(
      this.TEST_NAME,
      answers
    );
    this.questionsService
      .makeRequestByTestName(this.TEST_NAME, newRequest)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.isSubmitting.set(false);
          this.openSnackBar(error.message, 'Закрити');
          return of(error);
        })
      )
      .subscribe((results) => {
        this.isSubmitting.set(false);
        sessionStorage.setItem(this.testResultsInRouteKey, results);
        this.handlePersonType(results);
      });
  }

  answerQuestionByClick(value: { questionsId: string; answer: string }) {
    const control = this.formGroup.get(value.questionsId);

    if (control?.value === value.answer) {
      control.setValue(null, { emitEvent: false });
    }
    this.handlePercentageWithSnackBar();
    control?.setValue(value.answer, { emitEvent: true });

    if (this.formGroup.valid && this.isSuccessPayedTest()) {
      this.onSubmit();
      return;
    }

    //
    this.currentQuestionNumber.update((prev) => prev + 1);
    this.saveAnswersInStorage();
  }

  hideTextBoardOnClick() {
    this.showTextBoard.set(false);
    sessionStorage.setItem(
      this.TEST_NAME + '-showQuestions',
      JSON.stringify(false)
    );
  }
  //

  getInstructionsImgUrl(): string {
    return '/assets/new/core/tests/' + this.TEST_NAME + '/card/' + 1 + '.svg';
  }

  //
  private setStorageBoardValue() {
    const showQuestions = JSON.parse(
      sessionStorage.getItem(this.TEST_NAME + '-showQuestions') ?? 'true'
    );
    this.showTextBoard.set(showQuestions);
  }

  //

  private saveAnswersInStorage() {
    const answers = this.formGroup.value;

    sessionStorage.setItem(
      this.TEST_NAME + '-answers',
      JSON.stringify({
        answers,
        currentQuestion: this.currentQuestionNumber(),
      })
    );
  }

  // snackbar

  private handlePercentageWithSnackBar(): number {
    const totalQuestions = this.testQuestionsLength;
    const answeredQuestions = this.answeredQuestions();
    const progress = totalQuestions
      ? (answeredQuestions / totalQuestions) * 100
      : 0;

    this.handleSnackBarByProgress(progress);

    return progress;
  }

  private handleSnackBarByProgress(progress: number) {
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
  }
  //
  private answeredQuestions(): number {
    return Object.values(this.formGroup.value).filter(
      (value) => value !== null && value !== undefined && value !== ''
    ).length;
  }

  private openDialog(): void {
    const settings = this.questionsService.dialogSettings;

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

  getInvalidControls(): string[] | [] {
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
    this.beYourselfService.counterQuestion.next(1);

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
