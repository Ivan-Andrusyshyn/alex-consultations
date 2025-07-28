import { inject, Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

//
import { TestName, TestResults } from '../models/common-tests';
import { MonopayService } from '../../core/services/monopay.service';
import { TestResultsProviderService } from '../../core/services/test-results-provider.service';

interface ResultsResolver {
  message: string | null;
  results: TestResults | null;
  personType?: string;
  testName: TestName | null;
  seo?: {
    title: string;
    metaTags: Array<string>;
  };
}
interface TestInfo {
  testName: TestName;
  imgUrl: string;
  title: string;
  price: string | number;
  invoiceId: string;
}
//
@Injectable({
  providedIn: 'root',
})
export class TestsResultsResolver implements Resolve<any> {
  constructor(
    private monopayService: MonopayService,
    private testResultsProvider: TestResultsProviderService
  ) {}

  private router = inject(Router);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResultsResolver> {
    const personalityName = route.paramMap.get('categoryName') as string;

    const testName = route.parent?.paramMap.get('testName') as TestName;
    //

    return this.testResultsProvider
      .getTestResults(testName, personalityName)
      .pipe(
        switchMap((testResults) => {
          const isFreeTest = JSON.parse(
            localStorage.getItem(testName + '-isFreeTest') ?? 'null'
          ) as null | boolean;
          const testInfo = JSON.parse(
            localStorage.getItem(testName + '-paid-testInfo') ?? 'null'
          ) as TestInfo;
          //
          if (!isFreeTest) {
            return this.monopayService
              .checkStatus(testName, testInfo.invoiceId)
              .pipe(
                map((response) => {
                  if (response.status === 'success' && response.invoiceId) {
                    console.log('success');
                  } else {
                    this.router.navigateByUrl('/tests');
                  }
                  return testResults;
                })
              );
          } else {
            return of(testResults);
          }
        }),
        catchError((error) => {
          this.router.navigateByUrl('/not-found');
          return of(error);
        })
      );
  }
}
