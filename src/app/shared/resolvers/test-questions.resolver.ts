import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

import { Question, TestName } from '../models/common-tests';
import { MonopayService } from '../../core/services/monopay.service';
import { TestQuestionsProvider } from './test-questions-provider.service';

interface ResolveData {
  message: string | null;
  questions: Question[] | null;
  testName: TestName | null;
  testTitleText: string;
  testSubtitleText: string;
  testPrice: string | null;
  isSuccessPayedTest: boolean;
  isFreeTest: boolean;
  testInstruction?: {
    testTitle: string;
    instructionsTitle: string;
    steps: string[];
  };
  snackBar?: {
    firstSnackBarBtnText: string;
    secondSnackBarBtnText: string;
    secondSnackBar: string;
    firstSnackBar: string;
  };
  seo?: {
    title: string;
    metaTags: Array<string>;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TestsQuestionsResolver implements Resolve<any> {
  constructor(
    private testQuestionsProvider: TestQuestionsProvider,
    private monopayService: MonopayService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResolveData> {
    const testName = route.parent?.paramMap.get('testName') as TestName;
    let chooseTest$ = this.testQuestionsProvider.provideByTestName(testName);

    return chooseTest$?.pipe(
      switchMap((data) => {
        return this.monopayService.checkStatus(testName)?.pipe(
          map((response) => {
            let isSuccessPayedTest = false;
            let isFreeTest = false;
            let testPrice = data.testPrice;
            if (response.status === 'success' && response.invoiceId) {
              isSuccessPayedTest = response.status === 'success';
            } else if (testPrice === null) {
              isFreeTest = true;
              sessionStorage.setItem(testName + '-isFreeTest', 'true');
            }
            return {
              isSuccessPayedTest,
              isFreeTest,
              ...data,
            };
          }),
          catchError((error: any) =>
            of({
              ...data,
              isSuccessPayedTest: false,
              isFreeTest: false,
              message: error.message || 'Error checking payment status',
            })
          )
        );
      })
    );
  }
}
