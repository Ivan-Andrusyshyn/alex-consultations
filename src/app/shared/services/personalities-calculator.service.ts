import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CalculatorDisclaimer,
  CalculatorInformation,
  CalculatorResult,
} from '../types/16-personalities';
import { environment } from '../../environment/environment';

interface CalculatorResponse {
  message: string;
  relationshipsType: { title: string; text: string };
  scoreResult: number;
  calculatorResults: CalculatorResult;
}
@Injectable({
  providedIn: 'root',
})
export class PersonalitiesCalculatorService {
  readonly testsUrl = environment.apiUrl + '/tests';

  constructor(private http: HttpClient) {}

  getPersonalitiesCalculatorInformation(): Observable<{
    message: string;
    calculatorInformation: CalculatorInformation;
  }> {
    return this.http.get<{
      message: string;
      calculatorInformation: CalculatorInformation;
    }>(this.testsUrl + '/16-personalities/calculator-information');
  }
  getPersonalitiesCalculatorDisclaimer(): Observable<{
    message: string;
    calculatorDisclaimer: CalculatorDisclaimer;
  }> {
    return this.http.get<{
      message: string;
      calculatorDisclaimer: CalculatorDisclaimer;
    }>(this.testsUrl + '/16-personalities/calculator-disclaimer');
  }

  getPersonalitiesCalculatorResults(
    personsTypes: [string, string],
    userInformation: {
      routeTracker: string;
      referrer: string;
      testName: string;
      timestamp: string;
      device: string;
    }
  ): Observable<CalculatorResponse> {
    return this.http.post<CalculatorResponse>(
      this.testsUrl + '/16-personalities/calculator',
      { personsTypes, userInformation }
    );
  }
}
