import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';

import { environment } from '../../environment/environment';
import { PersonalityDayPhrases } from '../types/16-personalities';

interface PersonalitiesPhrasesResponse {
  message: string;
  dayPhrases: PersonalityDayPhrases[];
  dayNumber: number;
  userTypeName: string;
}
interface UsersPhraseSubject extends PersonalityDayPhrases {
  userTypeName: string;
}
@Injectable({
  providedIn: 'root',
})
export class PersonalitiesPhraseService {
  private readonly testsUrl = environment.apiUrl + '/tests';

  readonly storageKEY = 'personalityType';
  private usersPhraseSubject = new BehaviorSubject<UsersPhraseSubject | null>(
    null
  );

  constructor(private http: HttpClient) {}

  getUsersPhraseObservable(): Observable<UsersPhraseSubject | null> {
    return this.usersPhraseSubject.asObservable();
  }

  getPersonalitiesPhrases(): Observable<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: UsersPhraseSubject;
  }> {
    if (this.usersPhraseSubject.value) {
      return of({
        allPhrases: [],
        usersPhrase: this.usersPhraseSubject.value,
      });
    }
    const usersType = localStorage.getItem(this.storageKEY);

    return this.http
      .get<PersonalitiesPhrasesResponse>(
        this.testsUrl +
          '/16-personalities' +
          '/personalities-phrases' +
          '/' +
          usersType
      )
      .pipe(
        map((r) => {
          const usersPhrase = {
            userTypeName: r.userTypeName,
            ...this.findUsersTypePhrase(r.dayPhrases),
          };
          this.usersPhraseSubject.next(usersPhrase);
          return {
            allPhrases: r.dayPhrases,
            usersPhrase,
          };
        })
      );
  }

  private findUsersTypePhrase(dayPhrases: PersonalityDayPhrases[]) {
    const usersType = localStorage.getItem(this.storageKEY);

    return (
      dayPhrases.find((item) => item.personalityType === usersType) ?? {
        phrase: '',
        personalityType: '',
      }
    );
  }
}
