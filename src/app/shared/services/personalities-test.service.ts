import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import {
  Answer,
  PersonalityResult,
  Question,
  TestResult,
  TypeInformation,
} from '../types/test';
import { environment } from '../../environment/environment';

interface Personalities {
  message: string;
  answers: Answer[];
  questions: Question[];
}
interface PersonalitiesResults {
  results: { scores: TestResult; percentages: PersonalityResult };
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class PersonalitiesTestService {
  scoresSubject = new BehaviorSubject({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });
  isShowSendForm = new BehaviorSubject(false);
  isShowSendFormMessage = new BehaviorSubject(false);
  isShowResults = new BehaviorSubject(false);
  counterQuestion = new BehaviorSubject(1);
  personalityForm!: FormGroup;

  readonly testsUrl = environment.apiUrl + '/tests';
  questions!: Question[];
  scorePercentages = new BehaviorSubject<PersonalityResult>(null);

  constructor(private http: HttpClient) {
    const score = JSON.parse(
      sessionStorage.getItem('personality-test') ?? 'null'
    );
    if (score) {
      this.scoresSubject.next(score.results);
      this.scorePercentages.next(score.scorePercentages);
      this.isShowResults.next(true);
    }
  }

  getPersonalitiesTest(): Observable<any> {
    return this.http
      .get<Personalities>(this.testsUrl + '/16-personalities')
      .pipe(
        map((r) => {
          this.questions = r.questions;
          return r;
        })
      );
  }
  getPersonTypeByResults(scorePercentages: PersonalityResult): Observable<{
    personInformation: TypeInformation;
    message: string;
    personType: string;
  }> {
    return this.http.post<{
      personInformation: TypeInformation;
      message: string;
      personType: string;
    }>(this.testsUrl + '/16-personalities/person-type', scorePercentages);
  }

  getObservableScorePercentages(): Observable<PersonalityResult> {
    return this.scorePercentages.asObservable();
  }
  getIsShowSendForm(): Observable<boolean> {
    return this.isShowSendForm.asObservable();
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
  getIsShowSendFormMessage(): Observable<boolean> {
    return this.isShowSendFormMessage.asObservable();
  }
  getScoreKeys(): string[] {
    return Object.keys(this.scoresSubject.value);
  }
  getPersonalitiesResultOfTest(answers: any): Observable<PersonalitiesResults> {
    return this.http.post<PersonalitiesResults>(
      this.testsUrl + '/16-personalities/results',
      answers
    );
  }

  setResultsColors(score: string): string {
    if (score === 'E') {
      return 'E';
    } else if (score === 'S') {
      return 'S';
    } else if (score === 'T') {
      return 'T';
    } else if (score === 'N') {
      return 'N';
    } else if (score === 'I') {
      return 'I';
    } else if (score === 'J') {
      return 'J';
    } else if (score === 'P') {
      return 'P';
    } else {
      return 'F';
    }
  }
  getResultsDescriptions(score: string): string {
    const descriptions: { [key: string]: string } = {
      E: 'Екстраверсія',
      I: 'Інтроверсія',
      S: 'Сенсорика',
      N: 'Інтуїція',
      T: 'Логіка',
      F: 'Почуття',
      J: 'Судження',
      P: 'Сприйняття',
    };

    return descriptions[score];
  }
}
