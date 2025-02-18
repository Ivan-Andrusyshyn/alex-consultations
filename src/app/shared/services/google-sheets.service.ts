import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';

interface GoogleSheetTest {
  results: string;
  timestamp: string;
  testName: string;
  device: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private readonly BASE_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  postDataInSheet(data: GoogleSheetTest): Observable<any> {
    const scriptUrl: string = '/google/tests-results/send';
    return this.http.post(this.BASE_URL + scriptUrl, data);
  }

  getDeviceType(): string {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipad|ipod/i.test(userAgent)) {
      return 'Mobile Phone';
    } else if (/tablet|ipad/i.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Computer';
    }
  }
}
