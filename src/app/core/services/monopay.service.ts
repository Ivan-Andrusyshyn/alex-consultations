import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '../environment/environment';
import { TestName } from '../../shared/models/common-tests';

@Injectable({
  providedIn: 'root',
})
export class MonopayService {
  constructor(private http: HttpClient) {}
  private readonly testsUrl = environment.apiUrl;

  createPayment(data: any): Observable<{
    pageUrl: string;
    status: string;
    testName: TestName;
    invoiceId: string;
  }> {
    return this.http.post<{
      pageUrl: string;
      status: string;
      testName: TestName;
      invoiceId: string;
    }>(`${this.testsUrl}/api/monopay/create-payment`, data, {
      withCredentials: true,
    });
  }

  checkStatus(
    testName: TestName,
    invoiceId: string = 'unknown'
  ): Observable<{
    status: 'success' | 'created' | 'failed';
    invoiceId: string;
    testName: TestName;
  }> {
    return this.http
      .get<{
        status: 'created' | 'success' | 'failed';
        invoiceId: string;
        testName: TestName;
      }>(
        `${this.testsUrl}/api/monopay/check-status?testName=${testName}&invoiceId=${invoiceId}`,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((response) => {
          if (response.status === 'failed') {
            localStorage.removeItem(response.testName + '-paid-testInfo');
            localStorage.removeItem(response.testName + '-results');
          }
        })
      );
  }

  getClientInfo() {
    return this.http.get(`${this.testsUrl}/api/monopay/client-info`);
  }

  setWebhook(url: string) {
    return this.http.post(`${this.testsUrl}/api/monopay/set-webhook`, { url });
  }
}
