import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '../../environment/environment';
import { TestName } from '../../../shared/models/tests/common-tests';
import {
  MonoPaymentCheckStatusResponse,
  MonoPaymentCreateResponse,
  MonoPaymentRequest,
} from '../../../shared/models/payment/monopayment';
//

interface PaidData {
  invoiceId: string;
  testName: TestName;
  imgUrl: string;
  title: string;
  price: string;
  testPriceText: string;
}
//
@Injectable({
  providedIn: 'root',
})
export class MonopayService {
  constructor(private http: HttpClient) {}
  private readonly testsUrl = environment.apiUrl;

  createPayment(
    data: MonoPaymentRequest
  ): Observable<MonoPaymentCreateResponse> {
    return this.http.post<MonoPaymentCreateResponse>(
      `${this.testsUrl}/api/monopay/create-payment`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  checkStatus(
    testName: TestName,
    invoiceId: string = 'unknown'
  ): Observable<MonoPaymentCheckStatusResponse> {
    return this.http
      .get<MonoPaymentCheckStatusResponse>(
        `${this.testsUrl}/api/monopay/check-status?testName=${testName}&invoiceId=${invoiceId}`,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((response) => {
          const paidData = JSON.parse(
            localStorage.getItem(testName + '-paid-testInfo') ?? 'null'
          ) as PaidData;
          if (response.status === 'success' && paidData?.testPriceText) {
            this.setStorageTestInfo(paidData, testName);
          }
          if (response.status === 'failed') {
            localStorage.removeItem(response.testName + '-paid-testInfo');
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

  //
  private setStorageTestInfo(paidData: PaidData, testName: TestName) {
    localStorage.setItem(
      testName + '-paid-testInfo',
      JSON.stringify({
        invoiceId: paidData.invoiceId,
        testName: paidData.testName,
        imgUrl: paidData.imgUrl,
        title: paidData.title,
        price: paidData.price,
        testPriceText: 'Ваша покупка',
      })
    );
  }
}
