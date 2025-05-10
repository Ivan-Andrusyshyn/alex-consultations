import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  Question,
  TestResultRequest,
  TestResults,
} from '../../shared/models/common-tests';
import {
  CategoryName,
  RelationshipResult,
} from '../../shared/models/toxical-relationship';
import { TestInformation } from '../../shared/models/toxical-relationship';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ToxicalRelationshipService {
  private readonly testsUrl = environment.apiUrl + '/tests';
  counterQuestion = new BehaviorSubject(1);
  toxicalRelationshipResults = new BehaviorSubject<string | null>(null);
  isShowSendForm = new BehaviorSubject(false);
  constructor(private readonly http: HttpClient) {}

  getQuestions(): Observable<{
    message: string;
    questions: Question[];
  }> {
    return this.http.get<{
      message: string;
      questions: Question[];
    }>(this.testsUrl + '/toxical-relationship');
  }

  getToxicalRelationshipCategory(answers: TestResultRequest): Observable<{
    message: string;
    categoryName: CategoryName;
  }> {
    return this.http.post<{ message: string; categoryName: CategoryName }>(
      this.testsUrl + '/toxical-relationship' + '/category',
      answers
    );
  }
  getTestInformation(): Observable<{
    message: string;
    testInformation: TestInformation;
  }> {
    return this.http.get<{
      message: string;
      testInformation: TestInformation;
    }>(this.testsUrl + '/toxical-relationship' + '/information');
  }
  getToxicalRelationshipInfoByCategory(categoryName: string): Observable<{
    message: string;
    results: TestResults;
  }> {
    const encodedCategory = encodeURIComponent(categoryName);

    return this.http.get<{ message: string; results: TestResults }>(
      this.testsUrl +
        '/toxical-relationship' +
        '/results' +
        '/' +
        encodedCategory
    );
  }

  getIsShowSendForm(): Observable<boolean> {
    return this.isShowSendForm.asObservable();
  }
}
