import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CategoryName,
  RelationshipResult,
  TestInformation,
} from '../types/toxical-relationship';

import { environment } from '../../environment/environment';
import { Question, TestResultRequest } from '../types/common-tests';

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
    results: RelationshipResult;
  }> {
    const encodedCategory = encodeURIComponent(categoryName);

    return this.http.get<{ message: string; results: RelationshipResult }>(
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
