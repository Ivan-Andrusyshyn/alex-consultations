import { inject, Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { RoleInRelationshipsService } from '../../core/services/role-in-relationships.service';
import { TestResults } from '../models/common-tests';
import { PersonalitiesTestService } from '../../core/services/personalities-test.service';
import { AttractivenessService } from '../../core/services/attractiveness.service';
import { ToxicalRelationshipService } from '../../core/services/toxical-relationship.service';
import { TraumaticSensitivityService } from '../../core/services/traumatic-sensitivity.service';
import { YouCoffeeService } from '../../core/services/you-coffee.service';

interface ResultsResolver {
  message: string | null;
  results: TestResults | null;
  personType?: string;
  testName: string | null;
  seo?: {
    title: string;
    metaTags: Array<string>;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TestsResultsResolver implements Resolve<any> {
  constructor(
    private roleInRelationshipsService: RoleInRelationshipsService,
    private attractivenessService: AttractivenessService,
    private personalitiesService: PersonalitiesTestService,
    private traumaticSensitivityService: TraumaticSensitivityService,
    private toxicalRelationshipsService: ToxicalRelationshipService,
    private youCoffeeService: YouCoffeeService
  ) {}

  private router = inject(Router);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResultsResolver> {
    const personalityName = route.paramMap.get('categoryName') as string;

    const testName = route.parent?.paramMap.get('testName');

    if (testName === 'role-in-relationships') {
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
          }),
          catchError((error) => {
            this.router.navigateByUrl('/not-found');
            return of(error);
          })
        );
    }
    if (testName === 'you-coffee') {
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
          }),
          catchError((error) => {
            this.router.navigateByUrl('/not-found');
            return of(error);
          })
        );
    }

    if (testName === '16-personalities') {
      return this.personalitiesService
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
          }),
          catchError((error) => {
            this.router.navigateByUrl('/not-found');
            return of(error);
          })
        );
    }
    if (testName === 'attractiveness') {
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
          }),
          catchError((error) => {
            this.router.navigateByUrl('/not-found');
            return of(error);
          })
        );
    }
    if (testName === 'toxical-relationship') {
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
          }),
          catchError((error) => {
            this.router.navigateByUrl('/not-found');
            return of(error);
          })
        );
    }
    if (testName === 'traumatic-sensitivity') {
      return this.traumaticSensitivityService
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
          }),
          catchError((error) => {
            this.router.navigateByUrl('/not-found');
            return of(error);
          })
        );
    }
    return of({
      message: null,
      testName: null,
      results: null,
    });
  }
}
