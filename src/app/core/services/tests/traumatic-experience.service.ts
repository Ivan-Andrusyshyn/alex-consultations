import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environment/environment';
import {
  TestResultRequest,
  TestResults,
} from '../../../shared/models/common-tests';
import {
  TestResult,
  PersonalitiesResults,
  PersonalitiesResponse,
  TestInformation,
} from '../../../shared/models/traumatic-experience';
import { MainTestNames } from '../../utils/testsNames';

@Injectable({ providedIn: 'root' })
export class TraumaticExperienceService {
  private readonly testsUrl = environment.apiUrl + '/tests';
  scorePercentages = new BehaviorSubject<TestResult | null>(null);
  sensitivityResults = new BehaviorSubject<PersonalitiesResults | null>(null);
  counterQuestion = new BehaviorSubject(1);
  isShowSendForm = new BehaviorSubject(false);

  testName = MainTestNames.Traumatic;

  constructor(private http: HttpClient) {
    const results = JSON.parse(
      sessionStorage.getItem(this.testName + '-results') ?? 'null'
    );

    if (results) {
      this.scorePercentages.next(results.scorePercentages);
      this.sensitivityResults.next({
        results: { ...results },
      });
    }
  }

  getQuestions(): Observable<any> {
    return this.http.get<any>(this.testsUrl + '/' + this.testName).pipe(
      map((r) => {
        return r;
      })
    );
  }

  getTraumaticSensitivityResults(
    data: TestResultRequest
  ): Observable<PersonalitiesResponse> {
    return this.http.post<PersonalitiesResponse>(
      this.testsUrl + '/' + this.testName + '/results',
      data
    );
  }
  getEmotionsTypeInfoByResults(personCodeType: string): Observable<{
    results: TestResults;
    message: string;
  }> {
    return this.http.get<{
      results: TestResults;
      message: string;
    }>(
      this.testsUrl +
        '/' +
        this.testName +
        '/emotion-type' +
        '/' +
        personCodeType
    );
  }
  getTestInformation(): Observable<{
    message: string;
    testInformation: TestInformation;
  }> {
    return this.http.get<{
      message: string;
      testInformation: TestInformation;
    }>(this.testsUrl + '/' + this.testName + '/information');
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

  getScoreKeys(): string[] {
    const keys = Object.keys({
      E: 0,
      T: 0,
      W: 0,
      R: 0,
      F: 0,
      B: 0,
    });

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
