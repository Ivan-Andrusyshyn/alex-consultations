import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  RoleInRelationshipsInformation,
  RoleInRelationshipsResult,
} from '../../shared/models/role-in-relationships';
import { environment } from '../environment/environment';
import {
  Question,
  TestResultRequest,
  TestResults,
} from '../../shared/models/common-tests';
import { MainTestNames } from '../utils/testsNames';

@Injectable({
  providedIn: 'root',
})
export class RoleInRelationshipsService {
  private readonly testsUrl = environment.apiUrl + '/tests';

  counterQuestion = new BehaviorSubject(1);
  attractivenessResults = new BehaviorSubject<string | null>(null);
  isShowSendForm = new BehaviorSubject(false);
  testName = MainTestNames.RoleInRelationships;

  //
  constructor(private readonly http: HttpClient) {}

  getQuestions(): Observable<{
    message: string;
    questions: Question[];
  }> {
    return this.http.get<{
      message: string;
      questions: Question[];
    }>(this.testsUrl + '/' + this.testName);
  }

  getRoleInRelationshipsCategory(answers: TestResultRequest): Observable<{
    message: string;
    categoryName: string;
  }> {
    return this.http.post<{ message: string; categoryName: string }>(
      this.testsUrl + '/' + this.testName + '/category',
      answers
    );
  }
  getRoleInRelationshipsTestInformation(): Observable<{
    message: string;
    testInformation: RoleInRelationshipsInformation;
  }> {
    return this.http.get<{
      message: string;
      testInformation: RoleInRelationshipsInformation;
    }>(this.testsUrl + '/' + this.testName + '/information');
  }

  getRoleInRelationshipsInfoByCategory(categoryName: string): Observable<{
    message: string;
    results: TestResults;
  }> {
    const encodedCategory = encodeURIComponent(categoryName);

    return this.http.get<{
      message: string;
      results: TestResults;
    }>(
      this.testsUrl + '/' + this.testName + '/category' + '/' + encodedCategory
    );
  }
  getIsShowSendForm(): Observable<boolean> {
    return this.isShowSendForm.asObservable();
  }
}
