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
import { catchError, map, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

//
import { RefreshButtonComponent } from '../../shared/components/refresh-button/refresh-button.component';
import {
  Answer,
  CardContent,
  Question,
  TestName,
} from '../../shared/models/common-tests';
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
import { TEST_CARDS } from '../../core/content/TEST_CARDS';
import { CardPaymentComponent } from '../../shared/components/payment/card-payment/card-payment.component';
import { BeYourselfTestService } from '../../core/services/tests/be-yourself.service';

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
    CardPaymentComponent,
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
  // ─── Reactive Form & Data ────────────────
  formGroup: FormGroup = this.fb.group({});
  testQuestions$!: Observable<Question[]>;
  TEST_NAME!: TestName;
  testQuestionsLength!: number;
  coloredLabel: boolean = true;

  private isSnackBarOpened = false;

  // ─── UI Labels & Text
  testTitleText = '';
  testSubtitleText = '';
  testPrice: string | null = null;
  snackBar: SnackBar = {
    firstSnackBarBtnText: 'Йду далі',
    firstSnackBar: 'Ще трохи – і ти дізнаєшся щось, що може тебе здивувати! 😉',
    secondSnackBarBtnText: 'Розкрити себе',
    secondSnackBar: 'Ти молодець. Залишилось зовсім трішки до відкриття себе!',
  };
  //
  // ─── Signals
  isStartTest = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  currentQuestionNumber = signal<number>(1);
  showTextBoard = signal(true);
  isSuccessPayedTest = signal<boolean>(false);
  isFreeTest = signal<boolean>(false);
  //
  testsInstruction!: {
    instructionsTitle: string;
    testTitle: string;
    steps: string[];
  };

  // Payment
  redirectUrl = window.location.href;
  currentTestResultsName!: string;
  testsCards = TEST_CARDS;
  currentCardInfo!: CardContent | null;

  ngOnInit(): void {
    this.testQuestions$ = this.activeRoute.data.pipe(
      map((response) => {
        const data = response['data'];
        const scrollToTop = response['scrollToTop'];
        this.seoService.updateTitle(data['seo'].title);
        const testName: TestName = data['testName'];
        this.testTitleText = data['testTitleText'];
        this.testSubtitleText = data['testSubtitleText'];
        this.isSuccessPayedTest.set(data['isSuccessPayedTest']);
        //is it free test
        this.isFreeTest.set(data['isFreeTest']);

        localStorage.setItem(
          testName + '-isFreeTest',
          JSON.stringify(data['isFreeTest'])
        );

        // price
        this.testPrice = data['testPrice'];

        //
        this.testsInstruction = data['testsInstruction'];

        this.snackBar = data['snackBar'] || this.snackBar;
        //
        this.TEST_NAME = testName;
        const foundCard = this.testsCards.find((card) =>
          card.imageUrl.endsWith(testName + '/')
        );
        this.currentCardInfo = foundCard ?? null;
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
  //

  // ============================
  ngAfterViewInit(): void {
    this.setCurrentAnswers();
  }

  ngOnDestroy(): void {
    this.setSnackBar(false, 'false');

    this.formGroup.reset();
    localStorage.setItem(this.TEST_NAME + '-showQuestions', 'true');
    sessionStorage.setItem('isStartTest', 'false');
  }

  // ─── Payment
  createMonoPaymentByClick() {
    const baseUrl = window.location.origin;
    //

    //
    dataDevPayment.merchantPaymInfo.comment = this.TEST_NAME;
    dataDevPayment.redirectUrl =
      baseUrl + '/tests/' + this.TEST_NAME + '/payment-success';
    dataDevPayment.merchantPaymInfo.basketOrder[0].name =
      this.currentCardInfo?.title ?? 'test';
    //

    //
    this.monopayService
      .createPayment(dataDevPayment)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        const currentUrl = window.location.pathname;
        window.history.pushState({}, '', currentUrl);
        window.location.href = response.pageUrl;
        this.setInStorageTestInfo(response.invoiceId);
      });
  }
  private setInStorageTestInfo(invoiceId: string) {
    localStorage.setItem(
      this.TEST_NAME + '-paid-testInfo',
      JSON.stringify({
        invoiceId,
        testName: this.TEST_NAME,
        imgUrl: this.currentCardInfo?.imageUrl,
        title: this.currentCardInfo?.title,
        price: this.testPrice,
      })
    );
  }
  //

  // ─── Submission & Result
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
        localStorage.removeItem(this.TEST_NAME + '-answers');
        //
        this.handlePersonType(results);
      });
  }
  private handlePersonType(personType: string) {
    this.router.navigate(['tests', this.TEST_NAME, 'details', personType]);

    this.formGroup.reset();
    this.beYourselfService.counterQuestion.next(1);
  }
  // ===

  // ─── Form & Question Logic
  answerQuestionByClick(value: { questionsId: string; answer: string }) {
    const control = this.formGroup.get(value.questionsId);

    if (control?.value === value.answer) {
      control.setValue(null, { emitEvent: false });
    }
    this.handlePercentageWithSnackBar();
    control?.setValue(value.answer, { emitEvent: true });

    if (
      (this.formGroup.valid && this.isSuccessPayedTest()) ||
      (this.formGroup.valid && this.isFreeTest())
    ) {
      this.onSubmit();
      return;
    }

    //
    this.currentQuestionNumber.update((prev) => prev + 1);
    this.setInStorageAnswers();
  }

  changeViewQuestion(currentQuNumber: number) {
    this.currentQuestionNumber.set(currentQuNumber);
  }

  // ====

  // ─── UI Helpers
  hideTextBoardOnClick() {
    this.showTextBoard.set(false);
    localStorage.setItem(
      this.TEST_NAME + '-showQuestions',
      JSON.stringify(false)
    );
  }

  getBoardsImgUrl(): string {
    return '/assets/new/core/tests/' + this.TEST_NAME + '/card/' + 1 + '.svg';
  }
  //

  // ─── Navigation & Reset
  refreshTest() {
    this.openDialog();
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
          localStorage.removeItem(this.TEST_NAME + '-results');
          this.setInStorageAnswers();
        }
      });
  }
  //

  // ─── LocalStorage Helpers
  private setInStorageAnswers() {
    localStorage.setItem(
      this.TEST_NAME + '-answers',
      JSON.stringify({
        answers: this.formGroup.value,
        currentQuestion: this.currentQuestionNumber(),
      })
    );
  }
  private setStorageBoardValue() {
    const showQuestions = JSON.parse(
      localStorage.getItem(this.TEST_NAME + '-showQuestions') ?? 'true'
    );
    this.showTextBoard.set(showQuestions);
  }
  private setCurrentAnswers() {
    const parsedAnswers = this.questionsService.parseAnswers(this.TEST_NAME);

    if (parsedAnswers) {
      this.currentQuestionNumber.set(parsedAnswers.currentQuestion);
      this.formGroup.setValue(parsedAnswers.answers);
    }
  }

  //

  // ─── Snackbar & Progress
  openSnackBar(text: string, textBtn: string) {
    const snackBarRef = this._snackBar.open(text, textBtn, {
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'center',
    });

    snackBarRef.onAction().subscribe(() => {});
  }

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
  private answeredQuestions(): number {
    return Object.values(this.formGroup.value).filter(
      (value) => value !== null && value !== undefined && value !== ''
    ).length;
  }
  //

  private setSnackBar(isSnack: boolean, storage: string) {
    this.isSnackBarOpened = isSnack;
    sessionStorage.setItem('isSnackBarOpened', storage);
  }
}
