import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';

import { RoleInRelationshipsService } from '../../core/services/role-in-relationships.service';
import { Question, TestName } from '../models/common-tests';
import { PersonalitiesTestService } from '../../core/services/personalities-test.service';
import { AttractivenessService } from '../../core/services/attractiveness.service';
import { ToxicalRelationshipService } from '../../core/services/toxical-relationship.service';
import { TraumaticSensitivityService } from '../../core/services/traumatic-sensitivity.service';
import { YouCoffeeService } from '../../core/services/you-coffee.service';
import { QuestionsPageContent } from '../../../assets/content/QuestionsPageContent';

interface ResolveData {
  message: string | null;
  questions: Question[] | null;
  testName: TestName | null;
  testTitleText: string;
  testSubtitleText: string;
  testInstruction?: {
    instructionsTitle: string;
    steps: string[];
  };
  snackBar?: {
    firstSnackBarBtnText: string;
    secondSnackBarBtnText: string;
    secondSnackBar: string;
    firstSnackBar: string;
  };
  seo?: {
    title: string;
    metaTags: Array<string>;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TestsQuestionsResolver implements Resolve<any> {
  constructor(
    private youcoffeeService: YouCoffeeService,
    private roleInRelationshipsService: RoleInRelationshipsService,
    private attractivenessService: AttractivenessService,
    private personalitiesService: PersonalitiesTestService,
    private traumaticSensitivityService: TraumaticSensitivityService,
    private toxicalRelationshipsService: ToxicalRelationshipService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResolveData> {
    const testName = route.parent?.paramMap.get('testName') as TestName;

    if (testName === 'role-in-relationships') {
      return this.roleInRelationshipsService.getQuestions().pipe(
        map((r) => {
          return {
            ...r,
            testName,
            ...QuestionsPageContent[testName],
          };
        })
      );
    }

    if (testName === 'you-coffee') {
      return this.youcoffeeService.getQuestions().pipe(
        map((r) => {
          return {
            ...r,
            testName,
            snackBar: {
              firstSnackBarBtnText: 'Розкриваю аромат',
              secondSnackBarBtnText: 'Розкрити повний букет',
              secondSnackBar: '☕ Твоя кава майже заварена. Який у тебе аромат',
              firstSnackBar: '☕ Твій смак уже починає відкриватись',
            },
            ...QuestionsPageContent[testName],
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
            ...QuestionsPageContent[testName],
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
            ...QuestionsPageContent[testName],
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
            ...QuestionsPageContent[testName],
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
            ...QuestionsPageContent[testName],
          };
        })
      );
    }
    return of({
      message: null,
      testName: null,
      testTitleText: '',
      testSubtitleText: '',
      questions: null,
      seo: undefined,
    });
  }
}
