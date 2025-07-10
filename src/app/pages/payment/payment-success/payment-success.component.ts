import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  catchError,
  finalize,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
//

//
import {
  Answer,
  CardContent,
  TestName,
} from '../../../shared/models/common-tests';
import { fadeInAnimation } from '../../test-questions/fadeIn-animation';
import { TEST_CARDS } from '../../../core/content/TEST_CARDS';
import { MonopayService } from '../../../core/services/monopay.service';
import { QuestionsService } from '../../test-questions/questions.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatProgressSpinnerModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
  animations: [fadeInAnimation],
  providers: [QuestionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentSuccessComponent implements OnInit {
  //
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private monopayService = inject(MonopayService);
  private questionsService = inject(QuestionsService);
  //
  testsCards = TEST_CARDS;
  currentCardInfo!: CardContent | null;
  //
  cardInfo$!: Observable<{
    results: string | null;
    price?: string;
    testName: TestName;
    redirectUrl: string;
    paymentStatus: 'success' | 'created';
  }>;

  ngOnInit(): void {
    const testName = this.route.snapshot.paramMap.get('testName') as TestName;
    const price = this.route.snapshot.paramMap.get('price') as string;
    const storageResult = JSON.parse(
      sessionStorage.getItem(testName + '-results') ?? 'null'
    );
    //

    //
    this.cardInfo$ = this.monopayService.checkStatus(testName)?.pipe(
      map((response) => {
        const foundCard = this.testsCards.find((card) =>
          card.imageUrl.endsWith(testName + '/')
        );
        let result = storageResult ? storageResult.categoryName : null;
        this.currentCardInfo = foundCard ?? null;
        return this.getDataByStatus(response, testName, result, price);
      }),
      switchMap((data) => {
        const testAnswers = JSON.parse(
          sessionStorage.getItem(testName + '-answers') ?? 'null'
        ) as { answers: Answer[]; currentQuestion: string | number } | null;
        if (
          storageResult === null &&
          testAnswers &&
          data.paymentStatus === 'success'
        ) {
          const newRequest = this.questionsService.createNewRequestObject(
            testName,
            testAnswers?.answers
          );
          return this.makeReqByTestName(testName, newRequest, data);
        } else {
          this.cleanStorage(testName);
          //
          return of({ ...data, results: storageResult.categoryName });
        }
      }),

      catchError((error: any) => {
        return of(error.message);
      })
    );
  }

  private cleanStorage(testName: TestName) {
    sessionStorage.removeItem(testName + '-answers');
    sessionStorage.removeItem(testName + '-showQuestions');
  }

  private getDataByStatus(
    response: { status: string; invoiceId: string },
    testName: TestName,
    result: any,
    price: string | null
  ) {
    if (response.status === 'success' && response.invoiceId && testName) {
      return {
        results: result,
        testName,
        price,
        paymentStatus: response.status,
      };
    } else {
      this.router.navigateByUrl('/tests');
      return {
        paymentStatus: response.status,
        testName,
      };
    }
  }

  private makeReqByTestName(testName: TestName, newRequest: any, data: any) {
    return this.questionsService
      .makeRequestByTestName(testName, newRequest)
      .pipe(
        map((results) => {
          //
          this.cleanStorage(testName);
          return { ...data, results };
        })
      );
  }

  navigateByClick(testName: string, testResults: string | null) {
    if (testName && testResults) {
      this.router.navigate(['tests', testName, 'details', testResults]);
    } else {
      alert('problem with navigation data.');
    }
  }
}
