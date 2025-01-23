import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Answer, AnswerPoint, Question, TestResult } from '../types/test';
import { environment } from '../../environment/environment';

interface Personalities {
  message: string;
  answers: Answer[];
  questions: Question[];
}

@Injectable({
  providedIn: 'root',
})
export class PersonalitiesTestService {
  scoresSubject = new BehaviorSubject({
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  });

  isShowResults = new BehaviorSubject(false);
  counterQuestion = new BehaviorSubject(1);

  readonly testsUrl = environment.apiUrl + '/tests';
  questions!: Question[];

  constructor(private http: HttpClient) {}

  getPersonalitiesTest(): Observable<any> {
    return this.http
      .get<Personalities>(this.testsUrl + '/16-personalities')
      .pipe(
        map((r) => {
          this.questions = r.questions.slice();
          return r;
        })
      );
  }

  getIsShowResult(): Observable<boolean> {
    return this.isShowResults.asObservable();
  }
  getObservableScores(): Observable<{ [key: string]: number }> {
    return this.scoresSubject.asObservable();
  }
  getObservableCurrentQuestion(): Observable<number> {
    return this.counterQuestion.asObservable();
  }

  getScoreKeys() {
    return Object.keys(this.scoresSubject.value);
  }

  calculateMBTIScores(
    answers: Record<number, AnswerPoint>,
    questions: Question[]
  ): TestResult {
    const scores: TestResult = { EI: 0, SN: 0, TF: 0, JP: 0 };

    for (const [questionId, answer] of Object.entries(answers)) {
      const index = Number(questionId) - 1;

      const dichotomy = questions[index].dichotomy;
      scores[dichotomy] += Number(answer);
    }

    return scores;
  }

  setResultsColors(score: string): string {
    if (score === 'EI') {
      return 'EI';
    } else if (score === 'SN') {
      return 'SN';
    } else if (score === 'TF') {
      return 'TF';
    } else {
      return 'JP';
    }
  }
  getResultsDescriptions(score: string): { [key: string]: string } {
    const descriptions: { [key: string]: { [key: string]: string } } = {
      EI: { E: 'Екстраверсія', I: 'Інтроверсія' },
      SN: { S: 'Сенсорика', N: 'Інтуїція' },
      TF: { T: 'Логіка', F: 'Почуття' },
      JP: { J: 'Судження', P: 'Сприйняття' },
    };

    return descriptions[score];
  }
}
