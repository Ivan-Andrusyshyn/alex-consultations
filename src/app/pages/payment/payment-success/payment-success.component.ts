import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
//

//
import {
  Answer,
  CardContent,
  TestName,
} from '../../../shared/models/tests/common-tests';
import { fadeInAnimation } from '../../test-questions/fadeIn-animation';
import { TEST_CARDS } from '../../../core/content/TEST_CARDS';
import { MonopayService } from '../../../core/services/monopay.service';
import { QuestionsService } from '../../test-questions/questions.service';

interface TestInfo {
  testName: TestName;
  imgUrl: string;
  title: string;
  price: string | number;
  invoiceId: string;
}

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
  private routeActive = inject(ActivatedRoute);

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
    const testName = this.routeActive.parent?.snapshot.paramMap.get(
      'testName'
    ) as TestName;
    const testInfo = JSON.parse(
      localStorage.getItem(testName + '-paid-testInfo') ?? 'null'
    ) as TestInfo;
    if (!testInfo) {
      this.router.navigateByUrl('/tests');
    }

    const price = testInfo.price;
    const invoiceId = testInfo.invoiceId;

    const storageResult = JSON.parse(
      localStorage.getItem(testName + '-results') ?? 'null'
    );
    //
    this.cardInfo$ = this.getInfoByCheckSuccess(
      testName,
      invoiceId,
      storageResult,
      price
    );
  }
  //

  //
  private getInfoByCheckSuccess(
    testName: TestName,
    invoiceId: string,
    storageResult: null | { categoryName: string },
    price: number | string
  ) {
    return this.monopayService.checkStatus(testName, invoiceId)?.pipe(
      map((response) => {
        const foundCard = this.testsCards.find((card) =>
          card.imageUrl.endsWith(testName + '/')
        );
        let result = storageResult ? storageResult.categoryName : null;
        //
        this.currentCardInfo = foundCard ?? null;
        return this.getDataByStatus(response, testName, result, price);
      }),
      switchMap((response) => {
        const testAnswers = JSON.parse(
          sessionStorage.getItem(testName + '-answers') ?? 'null'
        ) as { answers: Answer[]; currentQuestion: string | number } | null;
        //

        const newRequest = this.questionsService.createNewRequestObject(
          testName,
          testAnswers?.answers
        );
        return this.makeReqByTestName(testName, newRequest, response);
      }),

      catchError((error: any) => {
        return of(error.message);
      })
    );
  }

  private getDataByStatus(
    response: { status: string; invoiceId: string },
    testName: TestName,
    results: any,
    price: string | number
  ) {
    const isSuccessPayed =
      response.status === 'success' && response.invoiceId && testName;
    if (isSuccessPayed) {
      return {
        results,
        testName,
        price,
      };
    } else {
      return {
        testName,
      };
    }
  }

  private makeReqByTestName(testName: TestName, newRequest: any, data: any) {
    return this.questionsService
      .makeRequestByTestName(testName, newRequest)
      .pipe(
        map((results) => {
          this.cleanStorage(testName);
          return { ...data, results };
        })
      );
  }

  private cleanStorage(testName: TestName) {
    localStorage.removeItem(testName + '-answers');
    localStorage.removeItem(testName + '-showQuestions');
  }

  navigateByClick(testName: string, testResults: string | null) {
    if (testName && testResults) {
      localStorage.removeItem(testName + '-results');
      this.router.navigate(['tests', testName, 'details', testResults]);
    } else {
      alert('problem with navigation data.');
    }
  }
}
