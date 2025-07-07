import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
//
//
import { MonopayService } from '../../core/services/monopay.service';
import { TestName } from '../models/common-tests';

@Injectable({
  providedIn: 'root',
})
export class TestsPaymentResolver implements Resolve<any> {
  constructor(private monopayService: MonopayService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    testResults?: string;
    testName: TestName;
    urlResults: string;
  }> {
    const testName = route.parent?.paramMap.get('testName') as TestName;
    const testResultsInRouteKey = testName + '-results-in-route';
    const baseUrl = window.location.origin;

    return this.monopayService.checkStatus(testName)?.pipe(
      map((response) => {
        if (response.status === 'success' && response.invoiceId && testName) {
          //  delete sessionStorage
          sessionStorage.removeItem(testName + '-answers');
          sessionStorage.removeItem(testName + '-showQuestions');
          //

          const testResults =
            sessionStorage.getItem(testResultsInRouteKey) ?? '';

          const urlResults =
            '/tests' + '/' + testName + '/details' + '/' + testResults;
          console.log(testResults, urlResults);

          return {
            testResults,
            testName,
            urlResults,
          };
        } else {
          const urlResults = baseUrl + '/tests' + testName + '/questions';
          return {
            urlResults,
            testName,
          };
        }
      })
    );
  }
}
