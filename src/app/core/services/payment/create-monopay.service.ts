import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//

//
import { environment } from '../../environment/environment';
import { MonoPaymentRequest } from '../../../shared/models/payment/monopayment';
import {
  CardContent,
  TestName,
} from '../../../shared/models/tests/common-tests';

@Injectable({
  providedIn: 'root',
})
export class CreateMonopayService {
  constructor(private http: HttpClient) {}
  private readonly testsUrl = environment.apiUrl;

  createPaymentObj(
    testName: TestName,
    testPrice: string | null,
    currentCardInfo: CardContent | null
  ): MonoPaymentRequest {
    const baseUrl = window.location.origin;
    const convertPrice = parseInt(testPrice as string, 10) * 100;
    const createBasketOrder = {
      name: currentCardInfo?.title ?? 'test',
      qty: 1,
      sum: convertPrice,
      total: convertPrice,
      icon: currentCardInfo?.imgWebUrl ?? null,
      unit: 'шт.',
      code: testName + '-' + Date.now().toString().slice(-5),
    };
    //

    const paymentObj = {
      amount: convertPrice,
      ccy: 980,
      merchantPaymInfo: {
        reference: '',
        destination: 'Оплата за тест',
        comment: testName,
        customerEmails: [],
        basketOrder: [createBasketOrder],
      },
      redirectUrl: baseUrl + '/tests/' + testName + '/payment-success',
      webHookUrl: environment.apiUrl + '/api/monopay/get-webhook',
      validity: 3600,

      agentFeePercent: 1.42,
    };

    return paymentObj;
  }

  setInStorageTestInfo(
    invoiceId: string,
    testName: TestName,
    testPrice: string | null,
    currentCardInfo: CardContent | null
  ) {
    const testPriceText = testPrice
      ? 'Вартість: ' + testPrice + 'грн'
      : 'Безкоштовно';

    // session
    sessionStorage.setItem(testName + '-isPendingPayment', 'true');
    // local
    localStorage.setItem(
      testName + '-paid-testInfo',
      JSON.stringify({
        invoiceId,
        testPriceText,
        testName: testName,
        imgUrl: currentCardInfo?.imageUrl,
        title: currentCardInfo?.title,
        price: testPrice,
      })
    );
  }
}
