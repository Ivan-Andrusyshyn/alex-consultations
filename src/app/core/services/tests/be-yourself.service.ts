import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//

//
import {
  Answer,
  Question,
  TestResults,
  TestResultRequest,
} from '../../../shared/models/tests/common-tests';
import { TestResult } from '../../../shared/models/tests/traumatic-experience';
import { environment } from '../../environment/environment';
import { MainTestNames } from '../../utils/testsNames';

interface BeYourself {
  message: string;
  answers: Answer[];
  questions: Question[];
}
interface BeYourselfResults {
  results: { scores: TestResult; percentages: TestResult; personType: string };
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class BeYourselfTestService {
  isShowSendForm = new BehaviorSubject(false);
  counterQuestion = new BehaviorSubject(1);
  errors$!: Observable<any[] | null>;
  readonly testsUrl = environment.apiUrl + '/tests';
  questions!: Question[];
  scorePercentages = new BehaviorSubject<TestResult | null>(null);
  testName = MainTestNames.BeYourself;

  constructor(private http: HttpClient) {
    const score = JSON.parse(
      sessionStorage.getItem(this.testName + '-results') ?? 'null'
    );
    if (score) {
      this.scorePercentages.next(score.scorePercentages);
    }
  }

  getQuestions(): Observable<any> {
    return this.http.get<BeYourself>(this.testsUrl + '/' + this.testName).pipe(
      map((r) => {
        this.questions = r.questions;
        return r;
      })
    );
  }

  getPersonTypeByResults(personType: string): Observable<{
    personInformation: TestResults;
    message: string;
    personType: string;
  }> {
    return this.http.get<{
      personInformation: TestResults;
      message: string;
      personType: string;
    }>(this.testsUrl + '/' + this.testName + '/person-type' + '/' + personType);
  }

  getPersonalitiesResultOfTest(
    data: TestResultRequest
  ): Observable<BeYourselfResults> {
    return this.http.post<BeYourselfResults>(
      this.testsUrl + '/' + this.testName + '/results',
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
