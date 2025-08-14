import { AsyncPipe } from '@angular/common';
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
import {
  catchError,
  interval,
  map,
  Observable,
  of,
  switchMap,
  takeWhile,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

//
import { RefreshButtonComponent } from '../../shared/components/refresh-button/refresh-button.component';
import {
  Answer,
  CardContent,
  Question,
  TestName,
} from '../../shared/models/tests/common-tests';
import { QuestionsStepperComponent } from '../../shared/components/test/questions/questions-stepper/questions-stepper.component';
import { SeoService } from '../../core/services/seo.service';
import { QuestionsService } from './questions.service';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import { QuestionWordPipe } from './test-questions.pipe';
import { ModalService } from '../../core/services/modal.service';
import { SnackBar } from './snackBar.interface';
import { QuestionOptionComponent } from '../../shared/components/test/questions/question-option/question-option.component';

import { TEST_CARDS } from '../../core/content/TEST_CARDS';
import { CardPaymentComponent } from '../../shared/components/payment/card-payment/card-payment.component';
import { BeYourselfTestService } from '../../core/services/tests/be-yourself.service';
import { environment } from '../../core/environment/environment';
import { PendingPaymentComponent } from '../../shared/components/payment/pending-payment/pending-payment.component';
import {
  MonoPaymentRequest,
  StatusPayment,
} from '../../shared/models/payment/monopayment';
import { QuestionsBoardComponent } from '../../shared/components/test/questions/questions-board/questions-board.component';
import { fadeInQuestionAnimation } from './question-animations';
import { TypingAnimationDirective } from '../../shared/directives/typing-animation.directive';
import { MonopayService } from '../../core/services/payment/monopay.service';
import { CreateMonopayService } from '../../core/services/payment/create-monopay.service';

@Component({
  selector: 'app-test-questions',
  standalone: true,
  imports: [
    RefreshButtonComponent,
    MatTabsModule,
    ReactiveFormsModule,
    AsyncPipe,
    QuestionsStepperComponent,
    TitleCardComponent,
    QuestionWordPipe,
    TypingAnimationDirective,
    QuestionOptionComponent,
    CardPaymentComponent,
    PendingPaymentComponent,
    QuestionsBoardComponent,
  ],
  templateUrl: './test-questions.component.html',
  styleUrl: './test-questions.component.scss',
  animations: [fadeInQuestionAnimation],
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
  private createMonopayService = inject(CreateMonopayService);
  //
  // ─── Reactive Form & Data ────────────────
  formGroup: FormGroup = this.fb.group({});
  testQuestions$!: Observable<Question[]>;
  TEST_NAME!: TestName;
  testQuestionsLength!: number;
  coloredLabel: boolean = true;

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
  showInitBoard = signal(true);
  isSuccessPayedTest = signal<boolean>(false);
  isFreeTest = signal<boolean>(false);
  isPendingPayment = signal<boolean>(false);
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
  paymentStatus: StatusPayment | null = null;
  //

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
        //

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
        const isPending = JSON.parse(
          sessionStorage.getItem(this.TEST_NAME + '-isPendingPayment') ??
            'false'
        );
        const invoiceId = JSON.parse(
          localStorage.getItem(this.TEST_NAME + '-paid-testInfo') ?? 'null'
        )?.invoiceId;
        this.isPendingPayment.set(isPending);

        //
        if (isPending && invoiceId) {
          return this.startIntervalChecking(invoiceId).pipe(
            map(() => questions)
          );
        }
        return this.monopayService.checkStatus(this.TEST_NAME, invoiceId).pipe(
          map((response) => {
            if (response.status === 'success') {
              this.paymentStatus = 'success';
            }

            return questions;
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    );

    //
    this.isStartTest.set(
      JSON.parse(sessionStorage.getItem('isStartTest') ?? 'false')
    );
  }
  //

  // ============================
  ngAfterViewInit(): void {
    this.setCurrentAnswers();
  }

  ngOnDestroy(): void {
    localStorage.setItem(this.TEST_NAME + '-showQuestions', 'true');
    sessionStorage.setItem('isStartTest', 'false');
    //
  }
  //onExitTest
  onExitTest(): void {
    this.isPendingPayment.set(false);
    this.formGroup.reset();
    sessionStorage.removeItem(this.TEST_NAME + '-isPendingPayment');
    sessionStorage.removeItem(this.TEST_NAME + '-answers');
  }

  // ─── Payment

  // close payment
  closePaymentByClick() {
    const confirmed = confirm('Ви впевнені, що хочете скасувати платіж?');

    if (confirmed) {
      this.isPendingPayment.set(false);
      sessionStorage.removeItem(this.TEST_NAME + '-isPendingPayment');
      localStorage.removeItem(this.TEST_NAME + '-paid-testInfo');
    }
  }
  //
  pendingPaymentOnClick() {
    sessionStorage.setItem(this.TEST_NAME + '-isPendingPayment', 'true');
    this.isPendingPayment.set(true);
  }
  // create payment
  createMonoPaymentByClick() {
    //obj
    const paymentObj = Object.freeze(
      this.createMonopayService.createPaymentObj(
        this.TEST_NAME,
        this.testPrice,
        this.currentCardInfo
      )
    );
    //
    const newTab = window.open('', '_blank');
    //
    this.monopayService
      .createPayment(paymentObj)
      .pipe(
        switchMap((response) => {
          const currentUrl = window.location.href;

          this.createMonopayService.setInStorageTestInfo(
            response.invoiceId,
            this.TEST_NAME,
            this.testPrice,
            this.currentCardInfo
          );

          //
          this.isPendingPayment.set(true);
          if (newTab) {
            window.history.pushState({}, '', currentUrl);
            newTab.location.href = response.pageUrl;
          }
          return this.startIntervalChecking(response.invoiceId);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((response) => {});
  }

  private startIntervalChecking(invoiceId: string): Observable<any> {
    return interval(3000).pipe(
      switchMap(() =>
        this.monopayService.checkStatus(this.TEST_NAME, invoiceId)
      ),
      takeWhile((response) => response.status !== 'success', true),
      map((response) => {
        if (response.status === 'success') {
          this.paymentStatus = 'success';
          sessionStorage.removeItem(this.TEST_NAME + '-isPendingPayment');
          this.isPendingPayment.set(false);
          const url = '/tests/' + this.TEST_NAME + '/payment-success';
          this.router.navigateByUrl(url);
        }
        return response;
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
        //
        this.handlePersonType(results);
      });
  }
  private handlePersonType(personType: string) {
    this.router.navigate(['tests', this.TEST_NAME, 'details', personType]);

    this.beYourselfService.counterQuestion.next(1);
  }
  // ===

  // ─── Form & Question Logic
  answerQuestionByClick(value: { questionsId: string; answer: string }) {
    const control = this.formGroup.get(value.questionsId);

    if (control?.value === value.answer) {
      control.setValue(null, { emitEvent: false });
    }
    // this.handlePercentageWithSnackBar();
    control?.setValue(value.answer, { emitEvent: true });

    if (
      (this.formGroup.valid && this.isSuccessPayedTest()) ||
      (this.formGroup.valid && this.isFreeTest())
    ) {
      this.onSubmit();
      this.setInStorageAnswers();
      return;
    }

    //
    this.currentQuestionNumber.update((prev) => {
      if (this.currentQuestionNumber() === this.testQuestionsLength) {
        return prev;
      }
      return prev + 1;
    });
    this.setInStorageAnswers();
  }

  changeViewQuestion(currentQuNumber: number) {
    this.currentQuestionNumber.set(currentQuNumber);
  }

  // ====

  // ─── UI Helpers
  hideTextBoardOnClick() {
    this.showInitBoard.set(false);
    localStorage.setItem(
      this.TEST_NAME + '-showInitBoard',
      JSON.stringify(false)
    );
    sessionStorage.removeItem(this.TEST_NAME + '-answers');
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

          this.cdr.markForCheck();
          sessionStorage.removeItem(this.TEST_NAME + '-isPendingPayment');
          this.currentQuestionNumber.set(1);
          this.isPendingPayment.set(false);
          this.setInStorageAnswers();
        }
      });
  }
  //

  // ─── LocalStorage Helpers
  private setInStorageAnswers() {
    sessionStorage.setItem(
      this.TEST_NAME + '-answers',
      JSON.stringify({
        answers: this.formGroup.value,
        currentQuestion: this.currentQuestionNumber(),
      })
    );
  }
  private setStorageBoardValue() {
    const showQuestions = JSON.parse(
      localStorage.getItem(this.TEST_NAME + '-showInitBoard') ?? 'true'
    );
    this.showInitBoard.set(showQuestions);
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

  //
}
