import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//

//
import {
  Question,
  TestResultRequest,
  TestResults,
} from '../../../shared/models/tests/common-tests';
import { environment } from '../../environment/environment';
import { MainTestNames } from '../../utils/testsNames';

@Injectable({
  providedIn: 'root',
})
export class AttractivenessService {
  private readonly testsUrl = environment.apiUrl + '/tests';

  counterQuestion = new BehaviorSubject(1);
  attractivenessResults = new BehaviorSubject<string | null>(null);
  isShowSendForm = new BehaviorSubject(false);
  constructor(private readonly http: HttpClient) {}
  testName = MainTestNames.Attractiveness;

  getQuestions(): Observable<{
    message: string;
    questions: Question[];
  }> {
    return this.http.get<{
      message: string;
      questions: Question[];
    }>(this.testsUrl + '/' + this.testName);
  }

  getAttractivenessCategory(answers: TestResultRequest): Observable<{
    message: string;
    categoryName: string;
  }> {
    return this.http.post<{ message: string; categoryName: string }>(
      this.testsUrl + '/' + this.testName + '/category',
      answers
    );
  }

  getAttractivenessInfoByCategory(categoryName: string): Observable<{
    message: string;
    results: TestResults;
  }> {
    return this.http.get<{ message: string; results: TestResults }>(
      this.testsUrl + '/' + this.testName + '/category' + '/' + categoryName
    );
  }
  getIsShowSendForm(): Observable<boolean> {
    return this.isShowSendForm.asObservable();
  }
}
