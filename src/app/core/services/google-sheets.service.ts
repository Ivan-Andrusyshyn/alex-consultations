import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';

import { environment } from '../environment/environment';

interface GoogleSheetTestResults {
  results: string;
  timestamp: string;
  testName: string;
  device: string;
}

interface GoogleSheetRegistration {
  name: string;
  socialMedia: string;
  feedBack?: string;
  timestamp?: string;
  referrer?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private readonly BASE_URL: string = environment.apiUrl;
  timestamp = DateTime.now()
    .setZone('Europe/Kyiv')
    .toFormat('yyyy-MM-dd HH:mm:ss');
  constructor(private http: HttpClient) {}

  postTestResultsInSheet(data: GoogleSheetTestResults): Observable<any> {
    const scriptUrl: string = '/google/tests-results/send';
    return this.http.post(this.BASE_URL + scriptUrl, data);
  }
  postRegistrationInSheet(data: GoogleSheetRegistration): Observable<any> {
    const scriptUrl: string = '/google/registration/send';

    data.timestamp = this.timestamp ?? '';
    data.referrer = document.referrer ?? '';
    return this.http.post(this.BASE_URL + scriptUrl, data);
  }

  postSheetsTestsFeedBack(data: {
    socialMedia: string;
    feedBack: string;
    timestamp?: string;
    referrer?: string;
  }): Observable<any> {
    data.timestamp = this.timestamp ?? '';
    data.referrer = document.referrer ?? '';

    const scriptUrl: string = '/google/feed-back/send';
    return this.http.post(this.BASE_URL + scriptUrl, data);
  }

  getSheetsTestsData(): Observable<any> {
    const scriptUrl: string = '/google/tests/data';
    return this.http.get(this.BASE_URL + scriptUrl);
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
