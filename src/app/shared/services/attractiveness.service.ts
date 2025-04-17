import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { AttractivenessResult } from '../types/attractiveness';
import { Question, TestResultRequest } from '../types/common-tests';

@Injectable({
  providedIn: 'root',
})
export class AttractivenessService {
  private readonly testsUrl = environment.apiUrl + '/tests';

  counterQuestion = new BehaviorSubject(1);
  attractivenessResults = new BehaviorSubject<string | null>(null);
  isShowSendForm = new BehaviorSubject(false);
  constructor(private readonly http: HttpClient) {}

  getQuestions(): Observable<{
    message: string;
    questions: Question[];
  }> {
    return this.http.get<{
      message: string;
      questions: Question[];
    }>(this.testsUrl + '/attractiveness');
  }

  getAttractivenessCategory(answers: TestResultRequest): Observable<{
    message: string;
    categoryName: string;
  }> {
    return this.http.post<{ message: string; categoryName: string }>(
      this.testsUrl + '/attractiveness' + '/category',
      answers
    );
  }

  getAttractivenessInfoByCategory(categoryName: string): Observable<{
    message: string;
    results: AttractivenessResult;
  }> {
    return this.http.get<{ message: string; results: AttractivenessResult }>(
      this.testsUrl + '/attractiveness' + '/category' + '/' + categoryName
    );
  }
  getIsShowSendForm(): Observable<boolean> {
    return this.isShowSendForm.asObservable();
  }
}
