import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CalculatorResult,
  CalculatorInformation,
  CalculatorDisclaimer,
} from '../../../shared/models/tests/personalities-calculator';
import { environment } from '../../environment/environment';
import { MainTestNames } from '../../utils/testsNames';

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
  testName = MainTestNames.BeYourself;
  constructor(private http: HttpClient) {}

  getPersonalitiesCalculatorInformation(): Observable<{
    message: string;
    calculatorInformation: CalculatorInformation;
  }> {
    return this.http.get<{
      message: string;
      calculatorInformation: CalculatorInformation;
    }>(this.testsUrl + '/' + this.testName + '/calculator-information');
  }
  getPersonalitiesCalculatorDisclaimer(): Observable<{
    message: string;
    calculatorDisclaimer: CalculatorDisclaimer;
  }> {
    return this.http.get<{
      message: string;
      calculatorDisclaimer: CalculatorDisclaimer;
    }>(this.testsUrl + '/' + this.testName + '/calculator-disclaimer');
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
      this.testsUrl + '/' + this.testName + '/calculator',
      { personsTypes, userInformation }
    );
  }
}
