import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environment/environment';
import {
  PersonalitiesResponse,
  PersonalitiesResults,
  TestResult,
  TypeInformation,
} from '../types/traumatic-sensitivity';
import { Answer } from '../types/16-personalities';

@Injectable({ providedIn: 'root' })
export class TraumaticSensitivityService {
  private readonly testsUrl = environment.apiUrl + '/tests';
  scorePercentages = new BehaviorSubject<TestResult | null>(null);
  sensitivityResults = new BehaviorSubject<PersonalitiesResults | null>(null);
  counterQuestion = new BehaviorSubject(1);
  isShowSendForm = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    const results = JSON.parse(
      sessionStorage.getItem('traumatic-sensitivity-results') ?? 'null'
    );

    if (results) {
      this.scorePercentages.next(results.scorePercentages);
      this.sensitivityResults.next({
        results: { ...results },
      });
    }
  }
  getTraumaticSensitivityTest(): Observable<any> {
    return this.http.get<any>(this.testsUrl + '/traumatic-sensitivity').pipe(
      map((r) => {
        return r;
      })
    );
  }

  getTraumaticSensitivityResults(data: {
    answers: Answer[];
    userInformation: {
      testName: string;
      routeTracker: string;
      referrer: string;
      timestamp: string;
      device: string;
    };
  }): Observable<PersonalitiesResponse> {
    return this.http.post<PersonalitiesResponse>(
      this.testsUrl + '/traumatic-sensitivity/results',
      data
    );
  }
  getEmotionsTypeInfoByResults(personCodeType: string): Observable<{
    information: TypeInformation;
    message: string;
  }> {
    return this.http.get<{
      information: TypeInformation;
      message: string;
    }>(
      this.testsUrl +
        '/traumatic-sensitivity/emotion-type' +
        '/' +
        personCodeType
    );
  }

  getObservableScorePercentages(): Observable<TestResult | null> {
    return this.scorePercentages.asObservable();
  }
  getIsShowSendForm(): Observable<boolean> {
    return this.isShowSendForm.asObservable();
  }
  getObservableSensitivityResults(): Observable<PersonalitiesResults | null> {
    return this.sensitivityResults.asObservable();
  }
  getObservableCurrentQuestion(): Observable<number> {
    return this.counterQuestion.asObservable();
  }

  getScoreKeys(): Array<keyof TestResult> {
    const keys = Object.keys({
      E: 0,
      T: 0,
      W: 0,
      R: 0,
      F: 0,
      B: 0,
    }) as (keyof TestResult)[];

    return keys;
  }
  getResultsDescriptions(score: string): string {
    const descriptions: { [key: string]: string } = {
      E: 'Емоційна чутливість ',
      T: 'Травматична',
      W: 'Критика роботи',
      R: 'Критика стосунків',
      F: 'Критика сім’ї',
      B: 'Критика тіла',
    };

    return descriptions[score];
  }
}
