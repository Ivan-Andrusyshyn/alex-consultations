import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { PersonalitiesTestService } from '../../core/services/personalities-test.service';
import { RouteTrackerService } from '../../core/services/route-tracker.service';
import { TestResultRequest } from '../../shared/models/common-tests';
import { AttractivenessService } from '../../core/services/attractiveness.service';
import { RoleInRelationshipsService } from '../../core/services/role-in-relationships.service';
import { ToxicalRelationshipService } from '../../core/services/toxical-relationship.service';
import { TraumaticSensitivityService } from '../../core/services/traumatic-sensitivity.service';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  private personalitiesService = inject(PersonalitiesTestService);
  private roleInRelationshipsService = inject(RoleInRelationshipsService);
  private attractivenessService = inject(AttractivenessService);
  private routeTracker = inject(RouteTrackerService);
  private toxicalRelationshipService = inject(ToxicalRelationshipService);
  private traumaticSensitivityService = inject(TraumaticSensitivityService);

  private roleInRelationships = 'role-in-relationships';
  private toxicalRelationships = 'toxical-relationship';
  private attractiveness = 'attractiveness';
  private personalities = '16-personalities';
  private traumatic = 'traumatic-sensitivity';

  makeRequestByTestName(
    testName: string,
    request: TestResultRequest
  ): Observable<any> {
    console.log(testName);

    if (testName === this.roleInRelationships) {
      return this.roleInRelationshipsService
        .getRoleInRelationshipsCategory(request)
        .pipe(
          map((r) => {
            this.setSessionStorage(
              testName + '-results',
              JSON.stringify({
                categoryName: r.categoryName,
              })
            );
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
            this.setSessionStorage(
              testName + '-results',
              JSON.stringify({
                categoryName: r.categoryName,
              })
            );
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
          this.setSessionStorage(
            testName + '-results',
            JSON.stringify({
              categoryName: r.categoryName,
            })
          );
          this.routeTracker.clearRouteMap();

          return r.categoryName;
        })
      );
    }
    if (testName === this.personalities) {
      return this.personalitiesService
        .getPersonalitiesResultOfTest(request)
        .pipe(
          map((r) => {
            this.setSessionStorage(
              testName + '-results',
              JSON.stringify({
                results: r.results.scores,
                scorePercentages: r.results.percentages,
              })
            );
            this.routeTracker.clearRouteMap();

            this.personalitiesService.scorePercentages.next(
              r.results.percentages
            );
            return r.results.personType;
          })
        );
    }
    if (testName === this.traumatic) {
      return this.traumaticSensitivityService
        .getTraumaticSensitivityResults(request)
        .pipe(
          map((r) => {
            this.setSessionStorage(
              this.traumatic + '-results',
              JSON.stringify({
                ...r.results,
              })
            );
            this.routeTracker.clearRouteMap();
            this.traumaticSensitivityService.scorePercentages.next(
              r.results.percentages
            );

            this.traumaticSensitivityService.sensitivityResults.next({
              results: r.results,
            });

            return r.results;
          })
        );
    } else {
      return of('');
    }
  }

  setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }
}
