import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';

interface GoogleSheetTestResults {
  results: string;
  timestamp: string;
  testName: string;
  device: string;
}

interface GoogleSheetRegistration {
  name: string;
  email: string;
  phone: string;
  interest: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private readonly BASE_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  postTestResultsInSheet(data: GoogleSheetTestResults): Observable<any> {
    const scriptUrl: string = '/google/tests-results/send';
    return this.http.post(this.BASE_URL + scriptUrl, data);
  }
  postRegistrationInSheet(data: GoogleSheetRegistration): Observable<any> {
    const scriptUrl: string = '/google/registration/send';
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
