import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';

import { environment } from '../../environment/environment';
import { PersonalityDayPhrases } from '../types/16-personalities';

interface PersonalitiesPhrasesResponse {
  message: string;
  dayPhrases: PersonalityDayPhrases[];
  dayNumber: number;
}

@Injectable({
  providedIn: 'root',
})
export class PersonalitiesPhraseService {
  private readonly testsUrl = environment.apiUrl + '/tests';

  readonly storageKEY = 'personalityType';
  private usersPhraseSubject = new Subject<PersonalityDayPhrases>();

  constructor(private http: HttpClient) {}

  getUsersPhraseObservable(): Observable<PersonalityDayPhrases> {
    return this.usersPhraseSubject.asObservable();
  }

  getPersonalitiesPhrases(): Observable<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: PersonalityDayPhrases;
  }> {
    return this.http
      .get<PersonalitiesPhrasesResponse>(
        this.testsUrl + '/16-personalities' + '/personalities-phrases'
      )
      .pipe(
        map((r) => {
          const usersPhrase = this.findUsersTypePhrase(r.dayPhrases) ?? {
            personalityType: '',
            phrase: '',
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

    return dayPhrases.find((item) => item.personalityType === usersType);
  }
}
