import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  Answer,
  Question,
  TestResult,
  TypeInformation,
} from '../types/16-personalities';
import { environment } from '../../environment/environment';

interface Personalities {
  message: string;
  answers: Answer[];
  questions: Question[];
}
interface PersonalitiesResults {
  results: { scores: TestResult; percentages: TestResult; personType: string };
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class PersonalitiesTestService {
  isShowSendForm = new BehaviorSubject(false);
  counterQuestion = new BehaviorSubject(1);
  errors$!: Observable<any[] | null>;
  readonly testsUrl = environment.apiUrl + '/tests';
  questions!: Question[];
  scorePercentages = new BehaviorSubject<TestResult | null>(null);

  constructor(private http: HttpClient) {
    const score = JSON.parse(
      sessionStorage.getItem('16-personalities-results') ?? 'null'
    );
    if (score) {
      this.scorePercentages.next(score.scorePercentages);
    }
  }

  getPersonalitiesTest(): Observable<any> {
    return this.http
      .get<Personalities>(this.testsUrl + '/16-personalities')
      .pipe(
        map((r) => {
          this.questions = r.questions;
          return r;
        })
      );
  }
  getPersonTypeByResults(personType: string): Observable<{
    personInformation: TypeInformation;
    message: string;
    personType: string;
  }> {
    return this.http.get<{
      personInformation: TypeInformation;
      message: string;
      personType: string;
    }>(this.testsUrl + '/16-personalities/person-type' + '/' + personType);
  }

  getPersonalitiesCalculatorResults(
    personsTypes: [string, string]
  ): Observable<{
    message: string;
    relationshipsType: string;
    scoreResult: number;
  }> {
    return this.http.post<any>(
      this.testsUrl + '/16-personalities/personalities-love-calculator',
      personsTypes
    );
  }
  getPersonType(scorePercentages: TestResult | null): Observable<{
    message: string;
    personType: string;
  }> {
    return this.http.post<{
      personInformation: TypeInformation;
      message: string;
      personType: string;
    }>(this.testsUrl + '/16-personalities/get-type', scorePercentages);
  }
  getPersonalitiesResultOfTest(data: {
    answers: Answer[];
    userInformation: {
      testName: string;
      referrer: string;
      routeTracker: string;
      timestamp: string;
      device: string;
    };
  }): Observable<PersonalitiesResults> {
    return this.http.post<PersonalitiesResults>(
      this.testsUrl + '/16-personalities/results',
      data
    );
  }
  getObservableScorePercentages(): Observable<TestResult | null> {
    return this.scorePercentages.asObservable();
  }
  getIsShowSendForm(): Observable<boolean> {
    return this.isShowSendForm.asObservable();
  }

  getObservableCurrentQuestion(): Observable<number> {
    return this.counterQuestion.asObservable();
  }

  getScoreKeys(): Array<keyof TestResult> {
    const keys = Object.keys({
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    }) as (keyof TestResult)[];

    return keys;
  }

  getResultsDescriptions(score: string): string {
    const descriptions: { [key: string]: string } = {
      E: 'Екстраверсія',
      I: 'Інтроверсія',
      S: 'Сенсорика',
      N: 'Інтуїція',
      T: 'Логіка',
      F: 'Почуття',
      J: 'Судження',
      P: 'Сприйняття',
    };

    return descriptions[score];
  }
}
