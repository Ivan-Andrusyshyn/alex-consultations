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
    results?: string;
    price?: string;
    testName: TestName;
    redirectUrl: string;
  }>;

  ngOnInit(): void {
    const testName = this.route.snapshot.paramMap.get('testName') as TestName;
    const price = this.route.snapshot.paramMap.get('price') as string;
    const storageResult = sessionStorage.getItem(testName + '-result') ?? null;
    //

    //
    this.cardInfo$ = this.monopayService.checkStatus(testName)?.pipe(
      map((response) => {
        const foundCard = this.testsCards.find((card) =>
          card.imageUrl.endsWith(testName + '/')
        );

        this.currentCardInfo = foundCard ?? null;
        if (response.status === 'success' && response.invoiceId && testName) {
          const redirectUrl =
            '/tests' + '/' + testName + '/details' + '/' + storageResult;

          return {
            results: storageResult,
            testName,
            price,
            redirectUrl,
          };
        } else {
          const redirectUrl = '/tests' + testName + '/questions';
          return {
            redirectUrl,
            testName,
          };
        }
      }),
      switchMap((data) => {
        let testResults;

        if (storageResult === null) {
          testResults = JSON.parse(
            sessionStorage.getItem(testName + '-answers') ?? 'null'
          ) as { answers: Answer[]; currentQuestion: string | number } | null;
          //
          const newRequest = this.questionsService.createNewRequestObject(
            testName,
            testResults?.answers
          );
          return this.questionsService
            .makeRequestByTestName(testName, newRequest)
            .pipe(
              map((results) => {
                sessionStorage.setItem(testName + '-result', results);
                //
                sessionStorage.removeItem(testName + '-answers');
                sessionStorage.removeItem(testName + '-showQuestions');
                return { ...data, results };
              })
            );
        } else {
          return of({ ...data, results: storageResult });
        }
      }),

      catchError((error: any) => {
        return of(error.message);
      })
    );
  }

  navigateByClick(testName: string, testResults: string | undefined) {
    if (testName && testResults) {
      // const url = `/tests/${this.testName}/details/${this.testResults}`;
      // window.location.href = url;
      this.router.navigate(['tests', testName, 'details', testResults]);
    } else {
      alert('problem with navigation data.');
    }
  }
}
