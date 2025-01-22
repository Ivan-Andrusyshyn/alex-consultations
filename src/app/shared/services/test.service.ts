import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import {
  Answer,
  AnswerPoint,
  Question,
  TestResult,
} from '../../shared/types/test';

interface Personalities {
  message: string;
  answers: Answer[];
  questions: Question[];
}

@Injectable({
  providedIn: 'root',
})
export class TestService {
  readonly testsUrl = environment.apiUrl + '/tests';
  questions!: Question[];

  constructor(private http: HttpClient) {}

  getPersonalitiesTest(): Observable<any> {
    return this.http
      .get<Personalities>(this.testsUrl + '/16-personalities')
      .pipe(
        map((r) => {
          this.questions = r.questions.slice(0, 1);
          return r;
        })
      );
  }
}
