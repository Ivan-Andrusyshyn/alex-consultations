import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';

import { environment } from '../../environment/environment';
import { personalityTypesContent } from '../../../assets/content/16-personalities/personalityTypes';
import { PersonalityDayPhrases } from '../types/personalities-phrases';

interface PersonalitiesPhrasesResponse {
  message: string;
  dayPhrases: PersonalityDayPhrases[];
  dayNumber: number;
  userTypeName: string;
}
interface UsersPhraseSubject extends PersonalityDayPhrases {
  userTypeName: string;
  typeAvatarUrl: string;
}
@Injectable({
  providedIn: 'root',
})
export class PersonalitiesPhraseService {
  private readonly testsUrl = environment.apiUrl + '/tests';

  readonly storageKEY = 'personalityType';

  private usersPhraseSubject = new BehaviorSubject<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: UsersPhraseSubject;
  } | null>(null);

  personalitiesContent = personalityTypesContent;

  constructor(private http: HttpClient) {}

  getUsersPhraseObservable(): Observable<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: UsersPhraseSubject;
  } | null> {
    return this.usersPhraseSubject.asObservable();
  }

  getPersonalitiesPhrases(): Observable<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: UsersPhraseSubject;
  }> {
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
          this.usersPhraseSubject.next({
            allPhrases: r.dayPhrases,
            usersPhrase,
          });
          return {
            allPhrases: r.dayPhrases,
            usersPhrase,
          };
        })
      );
  }

  private findUsersTypePhrase(dayPhrases: PersonalityDayPhrases[]) {
    const usersType = localStorage.getItem(this.storageKEY);
    const typeAvatarUrl =
      personalityTypesContent.find((item) => item.type === usersType)?.urlImg ??
      '';
    return {
      typeAvatarUrl,
      ...(dayPhrases.find((item) => item.personalityType === usersType) ?? {
        phrase: '',
        personalityType: '',
      }),
    };
  }
}
