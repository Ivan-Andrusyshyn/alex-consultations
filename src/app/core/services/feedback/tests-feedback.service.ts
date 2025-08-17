import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//

import { TestName } from '../../../shared/models/tests/common-tests';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

export interface Feedback {
  _id: string;
  message: string;
  createdAt: Date;
  testName: TestName;
}

//
@Injectable({
  providedIn: 'root',
})
export class TestsFeedbackService {
  private readonly testsUrl = environment.apiUrl + '/feedback';

  constructor(private http: HttpClient) {}
  //
  createTestsFeedback(message: string, testName: TestName) {
    return this.http.post(this.testsUrl + '/test', { message, testName });
  }
  //
  getAllTestsFeedback(): Observable<{ feedbacks: Feedback[] }> {
    return this.http.get<{ feedbacks: Feedback[] }>(
      this.testsUrl + '/tests/feedbacks'
    );
  }
}
