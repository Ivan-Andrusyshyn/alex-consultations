import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    }>(`${this.testsUrl}/api/monopay/create-payment`, data);
  }

  checkStatus(invoiceId: string): Observable<{
    status: 'pending' | 'success' | 'failed';
    invoiceId: string;
  }> {
    return this.http.get<{
      status: 'pending' | 'success' | 'failed';
      invoiceId: string;
    }>(`${this.testsUrl}/api/monopay/check-status?invoiceId=${invoiceId}`);
  }

  getClientInfo() {
    return this.http.get(`${this.testsUrl}/api/monopay/client-info`);
  }

  setWebhook(url: string) {
    return this.http.post(`${this.testsUrl}/api/monopay/set-webhook`, { url });
  }
}
