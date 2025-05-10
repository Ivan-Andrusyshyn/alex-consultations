import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';

import { RoleInRelationshipsService } from '../../core/services/role-in-relationships.service';
import { Question, TestResults } from '../models/common-tests';
import { PersonalitiesTestService } from '../../core/services/personalities-test.service';
import { AttractivenessService } from '../../core/services/attractiveness.service';
import { ToxicalRelationshipService } from '../../core/services/toxical-relationship.service';
import { TraumaticSensitivityService } from '../../core/services/traumatic-sensitivity.service';

@Injectable({
  providedIn: 'root',
})
export class TestsQuestionsResolver implements Resolve<any> {
  constructor(
    private roleInRelationshipsService: RoleInRelationshipsService,
    private attractivenessService: AttractivenessService,
    private personalitiesService: PersonalitiesTestService,
    private traumaticSensitivityService: TraumaticSensitivityService,
    private toxicalRelationshipsService: ToxicalRelationshipService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    message: string | null;
    questions: Question[] | null;
    testName: string | null;
    seo?: {
      title: string;
      metaTags: Array<string>;
    };
  }> {
    const testName = route.parent?.paramMap.get('testName');

    if (testName === 'role-in-relationships') {
      return this.roleInRelationshipsService.getQuestions().pipe(
        map((r) => {
          return {
            ...r,
            testName,
            seo: {
              title:
                'Тест: Яка твоя роль у стосунках? - Дай відповідь на питання',
              metaTags: [
                'Дізнайся більше про тест "Яка твоя роль у стосунках?", щоб краще зрозуміти свої сильні сторони, стиль спілкування та природні схильності.',
                'тест про стосунки, роль у стосунках, психологічний тест, самопізнання, взаємини, MBTI',
              ],
            },
          };
        })
      );
    }
    if (testName === '16-personalities') {
      return this.personalitiesService.getQuestions().pipe(
        map((r) => {
          return {
            ...r,
            testName,
            seo: {
              title: 'Запитання | 16 типів особистості | vidchuttia',
              metaTags: [
                'Відповідай на запитання тесту 16 типів особистості, щоб дізнатися свій унікальний тип.',
                'тест, 16 типів особистості, MBTI, запитання, психологія, саморозвиток',
              ],
            },
          };
        })
      );
    }
    if (testName === 'attractiveness') {
      return this.attractivenessService.getQuestions().pipe(
        map((r) => {
          return {
            ...r,
            testName,

            seo: {
              title: 'Запитання тесту на привабливість',
              metaTags: [
                'Відповідай на запитання тесту на привабливість, щоб дізнатися, як тебе сприймають інші. Оціни свою харизму, впевненість і чарівність!',
                'тест, привабливість, оцінка привабливості, зовнішність, харизма, впевненість, чарівність, психологічний тест, самопізнання',
              ],
            },
          };
        })
      );
    }
    if (testName === 'toxical-relationship') {
      return this.toxicalRelationshipsService.getQuestions().pipe(
        map((r) => {
          return {
            ...r,
            testName,

            seo: {
              title:
                'Запитання до тесту на токсичні відносини з партнером | Оціні свої стосунки',

              metaTags: [
                'Пройди тест на токсичні відносини з партнером, відповідаючи на запитання, які допоможуть оцінити рівень маніпуляцій та аб’юзу у твоїх стосунках.',
                'тест, запитання до тесту, токсичні відносини, партнер, стосунки, маніпуляції, аб’юз, психологія',
              ],
            },
          };
        })
      );
    }
    if (testName === 'traumatic-sensitivity') {
      return this.traumaticSensitivityService.getQuestions().pipe(
        map((r) => {
          return {
            ...r,
            testName,

            seo: {
              title: 'Запитання тесту на травматичну чутливість',
              metaTags: [
                'Відповідай на запитання тесту на травматичну чутливість, щоб краще зрозуміти свої реакції на стрес та рівень емоційної вразливості.',
                'тест, травматична чутливість, психологічний тест, емоційна вразливість, запитання, психіка, самопізнання',
              ],
            },
          };
        })
      );
    }
    return of({
      message: null,
      testName: null,
      questions: null,
      seo: undefined,
    });
  }
}
