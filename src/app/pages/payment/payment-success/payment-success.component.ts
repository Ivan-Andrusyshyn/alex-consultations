import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
//

//
import { CardContent, TestName } from '../../../shared/models/common-tests';
import { fadeInAnimation } from '../../test-questions/fadeIn-animation';
import { TEST_CARDS } from '../../../core/content/TEST_CARDS';
import { MonopayService } from '../../../core/services/monopay.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentSuccessComponent implements OnInit {
  //
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private monopayService = inject(MonopayService);

  testsCards = TEST_CARDS;
  currentCardInfo!: CardContent | null;
  //
  cardInfo$!: Observable<{
    testResults?: string;
    price?: string;
    testName: TestName;
    redirectUrl: string;
  }>;

  ngOnInit(): void {
    const testName = this.route.snapshot.paramMap.get('testName') as TestName;
    const price = this.route.snapshot.paramMap.get('price') as string;
    const testResults = this.route.snapshot.queryParamMap.get('results') ?? '';
    //
    this.cardInfo$ = this.monopayService.checkStatus(testName)?.pipe(
      map((response) => {
        const foundCard = this.testsCards.find((card) =>
          card.imageUrl.endsWith(testName + '/')
        );

        this.currentCardInfo = foundCard ?? null;
        if (response.status === 'success' && response.invoiceId && testName) {
          //  delete sessionStorage
          sessionStorage.removeItem(testName + '-answers');
          sessionStorage.removeItem(testName + '-showQuestions');
          //

          const redirectUrl =
            '/tests' + '/' + testName + '/details' + '/' + testResults;

          return {
            testResults,
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
