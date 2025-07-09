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
    const price = route.paramMap.get('price') as string;

    return this.monopayService.checkStatus(testName)?.pipe(
      map((response) => {
        if (response.status === 'success' && response.invoiceId && testName) {
          //  delete sessionStorage
          sessionStorage.removeItem(testName + '-answers');
          sessionStorage.removeItem(testName + '-showQuestions');
          //

          const urlSearchParams = new URLSearchParams(state.url.split('?')[1]);
          const testResults = urlSearchParams.get('results') ?? '';
          const urlResults =
            '/tests' + '/' + testName + '/details' + '/' + testResults;

          return {
            testResults,
            testName,
            price,
            urlResults,
          };
        } else {
          const urlResults = '/tests' + testName + '/questions';
          return {
            urlResults,
            testName,
          };
        }
      })
    );
  }
}
