import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AnswerPoint, Question, TestResult } from '../types/test';

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

  constructor() {}

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
      const question = questions.find((q) => {
        return q.id === Number(questionId);
      });

      if (question) {
        scores[question.dichotomy] += Number(answer);
        console.log((scores[question.dichotomy] += Number(answer)));
      }
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
