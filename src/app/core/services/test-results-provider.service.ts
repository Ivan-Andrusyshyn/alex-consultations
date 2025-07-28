import { Injectable } from '@angular/core';
//
import { catchError, map, Observable, of } from 'rxjs';

//
import { AttractivenessService } from './tests/attractiveness.service';
import { BeYourselfTestService } from './tests/be-yourself.service';
import { RoleInRelationshipsService } from './tests/role-in-relationships.service';
import { ToxicalRelationshipService } from './tests/toxical-relationship.service';
import { TraumaticExperienceService } from './tests/traumatic-experience.service';
import { YouCoffeeService } from './tests/you-coffee.service';
import { MainTestNames } from '../utils/testsNames';
import { TestName, TestResults } from '../../shared/models/common-tests';
//

interface ResultsResolver {
  message: string | null;
  results: TestResults | null;
  personType?: string;
  testName: TestName | null;
  seo?: {
    title: string;
    metaTags: Array<string>;
  };
}

//
@Injectable({
  providedIn: 'root',
})
export class TestResultsProviderService {
  constructor(
    private roleInRelationshipsService: RoleInRelationshipsService,
    private attractivenessService: AttractivenessService,
    private beYourselfService: BeYourselfTestService,
    private traumaticExperienceService: TraumaticExperienceService,
    private toxicalRelationshipsService: ToxicalRelationshipService,
    private youCoffeeService: YouCoffeeService
  ) {}

  getTestResults(
    testName: TestName,
    personalityName: string
  ): Observable<ResultsResolver> {
    if (testName === MainTestNames.RoleInRelationships) {
      return this.roleInRelationshipsService
        .getRoleInRelationshipsInfoByCategory(personalityName!)
        .pipe(
          map((r) => {
            return {
              ...r,
              testName,

              seo: {
                title:
                  'Результати тесту твоя роль у стосунках?| Дізнайся, власну роль у стосунках.',
                metaTags: [
                  'Дізнайся більше про тест "Яка твоя роль у стосунках?", щоб краще зрозуміти свої сильні сторони, стиль спілкування та природні схильності.',
                  'тест про стосунки, роль у стосунках, психологічний тест, самопізнання, взаємини, MBTI',
                ],
              },
            };
          })
        );
    }
    if (testName === MainTestNames.YouCoffee) {
      return this.youCoffeeService
        .youCoffeeInfoByCategory(personalityName)
        .pipe(
          map((r) => {
            const subCategoryCoffee =
              sessionStorage.getItem('subCategoryCoffee');
            return {
              ...r,
              testName,
              subCategoryCoffee,
              seo: {
                title:
                  'Результати тесту Яка ти кава | Дізнайся, наскільки ти смачна, гірка чи ароматна кава',

                metaTags: [
                  'Пройди тест Яка ти кава і дізнайся, наскільки ти чарівний(а) в очах інших. Оціни свої унікальні риси разом з ароматом смачної кави!',
                  'тест на те яка саме ти кава, оцінка аромату, харизма, зовнішність, чарівність, краса, самооцінка, впевненість, особистість',
                ],
              },
            };
          })
        );
    }

    if (testName === MainTestNames.BeYourself) {
      return this.beYourselfService
        .getPersonTypeByResults(personalityName!)
        .pipe(
          map((response) => ({
            results: response.personInformation,
            message: response.message,
            personType: response.personType,
          }))
        )
        .pipe(
          map((r) => {
            return {
              ...r,
              testName,

              seo: {
                title:
                  'Результати тесту 16 типів особистості | Дізнайся більше про свій тип',

                metaTags: [
                  'Дізнайся результати тесту 16 типів особистості та отримай детальний опис свого типу особистості, його сильних і слабких сторін, а також рекомендації для розвитку.',
                  'результати тесту, 16 типів особистості, MBTI, психологія, саморозвиток, типи особистості, рекомендації',
                ],
              },
            };
          })
        );
    }
    if (testName === MainTestNames.Attractiveness) {
      return this.attractivenessService
        .getAttractivenessInfoByCategory(personalityName)
        .pipe(
          map((r) => {
            return {
              ...r,
              testName,

              seo: {
                title:
                  'Результати тесту на твою привабливість | Дізнайся, наскільки ти чарівний(а)',

                metaTags: [
                  'Пройди тест на привабливість і дізнайся, наскільки ти чарівний(а) в очах інших. Оціни свої унікальні риси, харизму та привабливість!',
                  'тест на привабливість, оцінка привабливості, харизма, зовнішність, чарівність, краса, самооцінка, впевненість, особистість',
                ],
              },
            };
          })
        );
    }
    if (testName === MainTestNames.ToxicalRelationships) {
      return this.toxicalRelationshipsService
        .getToxicalRelationshipInfoByCategory(personalityName!)
        .pipe(
          map((r) => {
            return {
              ...r,
              testName,

              seo: {
                title: 'Результати тесту на травматичну чутливість',
                metaTags: [
                  'Дізнайся свої результати тесту на травматичну чутливість. Аналізуй рівень емоційної вразливості та зрозумій, як він впливає на твоє життя.',
                  'результати тесту, травматична чутливість, емоційна вразливість, психологія, психіка, самопізнання',
                ],
              },
            };
          })
        );
    }
    if (testName === MainTestNames.Traumatic) {
      return this.traumaticExperienceService
        .getEmotionsTypeInfoByResults(personalityName!)
        .pipe(
          map((r) => {
            return {
              ...r,
              testName,

              seo: {
                title:
                  'Результати тесту твоя роль у стосунках?| Дізнайся, власну роль у стосунках.',
                metaTags: [
                  'Дізнайся більше про тест "Яка твоя роль у стосунках?", щоб краще зрозуміти свої сильні сторони, стиль спілкування та природні схильності.',
                  'тест про стосунки, роль у стосунках, психологічний тест, самопізнання, взаємини, MBTI',
                ],
              },
            };
          })
        );
    } else {
      return of({
        message: 'Test not found',
        results: null,
        testName: null,
      });
    }
  }
}
