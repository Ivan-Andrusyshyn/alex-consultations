import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
//

//
import {
  Question,
  TestResultRequest,
  TestResults,
} from '../../../shared/models/common-tests';
import { environment } from '../../environment/environment';
import { MainTestNames } from '../../utils/testsNames';

@Injectable({
  providedIn: 'root',
})
export class YouCoffeeService {
  private readonly testsUrl = environment.apiUrl + '/tests';

  counterQuestion = new BehaviorSubject(1);
  attractivenessResults = new BehaviorSubject<string | null>(null);
  isShowSendForm = new BehaviorSubject(false);
  testName = MainTestNames.YouCoffee;

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

  youCoffeeCategory(answers: TestResultRequest): Observable<{
    message: string;
    subCategoryName: string;
    categoryName: string;
  }> {
    return this.http.post<{
      message: string;
      subCategoryName: string;
      categoryName: string;
    }>(this.testsUrl + '/' + this.testName + '/category', answers);
  }
  youCoffeeTestInformation(): Observable<{
    message: string;
    testInformation: any;
  }> {
    return this.http.get<{
      message: string;
      testInformation: any;
    }>(this.testsUrl + '/' + this.testName + '/information');
  }

  youCoffeeInfoByCategory(categoryName: string): Observable<{
    message: string;
    results: TestResults & { subCategoryName: string };
  }> {
    const encodedCategory = encodeURIComponent(categoryName);

    return this.http.get<{
      message: string;
      results: TestResults & { subCategoryName: string };
    }>(
      this.testsUrl + '/' + this.testName + '/category' + '/' + encodedCategory
    );
  }
  getIsShowSendForm(): Observable<boolean> {
    return this.isShowSendForm.asObservable();
  }
}
