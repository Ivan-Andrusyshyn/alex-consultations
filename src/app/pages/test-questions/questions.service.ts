import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { RouteTrackerService } from '../../core/services/route-tracker.service';
import {
  Question,
  TestName,
  TestResultRequest,
} from '../../shared/models/common-tests';
import { AttractivenessService } from '../../core/services/attractiveness.service';
import { RoleInRelationshipsService } from '../../core/services/role-in-relationships.service';
import { ToxicalRelationshipService } from '../../core/services/toxical-relationship.service';
import { YouCoffeeService } from '../../core/services/you-coffee.service';
import { Validators } from '@angular/forms';
import { GoogleSheetsService } from '../../core/services/google-sheets.service';
import { DateTime } from 'luxon';
import { BeYourselfTestService } from '../../core/services/be-yourself.service';
import { TraumaticExperienceService } from '../../core/services/traumatic-experience.service';
import { MainTestNames } from '../../core/utils/testsNames';
//

//
@Injectable()
export class QuestionsService {
  private beYourselfService = inject(BeYourselfTestService);
  private roleInRelationshipsService = inject(RoleInRelationshipsService);
  private attractivenessService = inject(AttractivenessService);
  private routeTracker = inject(RouteTrackerService);
  private toxicalRelationshipService = inject(ToxicalRelationshipService);
  private traumaticExperienceService = inject(TraumaticExperienceService);
  private youCoffeeService = inject(YouCoffeeService);
  private googleSheetService = inject(GoogleSheetsService);

  private roleInRelationships = MainTestNames.RoleInRelationships;
  private toxicalRelationships = MainTestNames.ToxicalRelationships;
  private attractiveness = MainTestNames.Attractiveness;
  private beYourself = MainTestNames.BeYourself;
  private traumatic = MainTestNames.Traumatic;
  private youCoffee = MainTestNames.YouCoffee;
  //

  timestamp = DateTime.now()
    .setZone('Europe/Kyiv')
    .toFormat('yyyy-MM-dd HH:mm:ss');
  dialogSettings = {
    width: '300px',
    height: '170px',
    isForm: false,
    isConfirm: true,
  };
  // ========================

  // ==============================
  createNewRequestObject(testName: TestName, answers: any) {
    return {
      answers,
      userInformation: {
        routeTracker: this.routeTracker.getRoutes(),
        referrer: document.referrer ?? '',
        testName,
        timestamp: this.timestamp ?? '',
        device: this.googleSheetService.getDeviceType(),
      },
    };
  }

  createFormGroup(questions: Question[]): { [key: string]: any } {
    const formControls: { [key: string]: any } = {};

    questions.forEach((q: Question, i: number) => {
      formControls[q.id.toString()] = ['', Validators.required];
    });

    return formControls;
  }
  parseAnswers(testName: string) {
    const stringAnswers =
      sessionStorage.getItem(testName + '-answers') ?? 'null';
    return JSON.parse(stringAnswers);
  }
  makeRequestByTestName(
    testName: TestName,
    request: TestResultRequest
  ): Observable<any> {
    if (testName === this.youCoffee) {
      return this.youCoffeeService.youCoffeeCategory(request).pipe(
        map((r) => {
          this.setSessionStorage(testName, {
            categoryName: r.categoryName,
          });
          sessionStorage.setItem('subCategoryCoffee', r.subCategoryName);
          this.routeTracker.clearRouteMap();
          return r.categoryName;
        })
      );
    }
    if (testName === this.roleInRelationships) {
      return this.roleInRelationshipsService
        .getRoleInRelationshipsCategory(request)
        .pipe(
          map((r) => {
            this.setSessionStorage(testName, {
              categoryName: r.categoryName,
            });
            this.routeTracker.clearRouteMap();

            return r.categoryName;
          })
        );
    }
    if (testName === this.toxicalRelationships) {
      return this.toxicalRelationshipService
        .getToxicalRelationshipCategory(request)
        .pipe(
          map((r) => {
            this.setSessionStorage(testName, {
              categoryName: r.categoryName,
            });
            this.routeTracker.clearRouteMap();

            this.toxicalRelationshipService.toxicalRelationshipResults.next(
              r.categoryName
            );

            return r.categoryName;
          })
        );
    }
    if (testName === this.attractiveness) {
      return this.attractivenessService.getAttractivenessCategory(request).pipe(
        map((r) => {
          this.setSessionStorage(testName, {
            categoryName: r.categoryName,
          });
          this.routeTracker.clearRouteMap();

          return r.categoryName;
        })
      );
    }
    if (testName === this.beYourself) {
      return this.beYourselfService.getPersonalitiesResultOfTest(request).pipe(
        map((r) => {
          this.setSessionStorage(testName, {
            results: r.results.scores,
            scorePercentages: r.results.percentages,
          });
          this.routeTracker.clearRouteMap();

          this.beYourselfService.scorePercentages.next(r.results.percentages);
          return r.results.personType;
        })
      );
    }
    if (testName === this.traumatic) {
      return this.traumaticExperienceService
        .getTraumaticSensitivityResults(request)
        .pipe(
          map((r) => {
            this.setSessionStorage(testName, {
              ...r.results,
            });
            this.routeTracker.clearRouteMap();
            this.traumaticExperienceService.scorePercentages.next(
              r.results.percentages
            );

            this.traumaticExperienceService.sensitivityResults.next({
              results: r.results,
            });

            return r.results;
          })
        );
    } else {
      return of('');
    }
  }

  private setSessionStorage(key: string, value: any) {
    const fullKey = key + '-results';
    sessionStorage.setItem(fullKey, JSON.stringify(value));
  }
}
