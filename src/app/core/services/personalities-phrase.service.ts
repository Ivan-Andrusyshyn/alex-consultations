import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';

import { personalityTypesContent } from '../../../assets/content/16-personalities/personalityTypes';
import { PersonalityDayPhrases } from '../../shared/models/personalities-phrases';
import { environment } from '../environment/environment';

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

  personalitiesContent = personalityTypesContent;

  constructor(private http: HttpClient) {}

  getPersonalitiesPhrases(): Observable<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: UsersPhraseSubject;
  }> {
    const usersType = localStorage.getItem(this.storageKEY);

    const isUrlParams = usersType ? '/' + usersType : '/unknown';

    return this.http
      .get<PersonalitiesPhrasesResponse>(
        this.testsUrl +
          '/16-personalities' +
          '/personalities-phrases' +
          isUrlParams
      )
      .pipe(
        map((r) => {
          const usersPhrase = {
            userTypeName: r.userTypeName,
            ...this.findUsersTypePhrase(r.dayPhrases),
          };

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
//
