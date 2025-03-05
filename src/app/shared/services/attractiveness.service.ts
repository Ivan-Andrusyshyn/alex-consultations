import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { AttractivenessResult, Question } from '../types/attractiveness';

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

  getAttractivenessCategory(answers: any): Observable<{
    message: string;
    categoryName: any;
  }> {
    return this.http.post<{ message: string; categoryName: any }>(
      this.testsUrl + '/attractiveness' + '/category',
      answers
    );
  }

  getAttractivenessInfoByCategory(categoryName: string): Observable<{
    message: string;
    results: AttractivenessResult;
  }> {
    const encodedCategory = encodeURIComponent(categoryName);

    return this.http.get<{ message: string; results: AttractivenessResult }>(
      this.testsUrl + '/attractiveness' + '/category' + '/' + encodedCategory
    );
  }
  getIsShowSendForm(): Observable<boolean> {
    return this.isShowSendForm.asObservable();
  }
}
