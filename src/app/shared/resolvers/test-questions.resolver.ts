import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';

import { RoleInRelationshipsService } from '../../core/services/role-in-relationships.service';
import { Question, TestName } from '../models/common-tests';
import { BeYourselfTestService } from '../../core/services/be-yourself.service';
import { AttractivenessService } from '../../core/services/attractiveness.service';
import { ToxicalRelationshipService } from '../../core/services/toxical-relationship.service';
import { YouCoffeeService } from '../../core/services/you-coffee.service';
import { TraumaticExperienceService } from '../../core/services/traumatic-experience.service';
import { MainTestNames } from '../../core/utils/testsNames';
import { QuestionsPageContent } from '../../core/content/QuestionsPageContent';

interface ResolveData {
  message: string | null;
  questions: Question[] | null;
  testName: TestName | null;
  testTitleText: string;
  testSubtitleText: string;
  testPrice: string | null;
  testInstruction?: {
    testTitle: string;
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
    private beYourselfService: BeYourselfTestService,
    private traumaticExperienceService: TraumaticExperienceService,
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

    if (testName === MainTestNames.YouCoffee) {
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
    if (testName === MainTestNames.BeYourself) {
      return this.beYourselfService.getQuestions().pipe(
        map((r) => {
          return {
            ...r,
            testName,
            ...QuestionsPageContent[testName],
          };
        })
      );
    }
    if (testName === MainTestNames.Attractiveness) {
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
    if (testName === MainTestNames.ToxicalRelationships) {
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
    if (testName === MainTestNames.Traumatic) {
      return this.traumaticExperienceService.getQuestions().pipe(
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
      testPrice: null,
      testTitleText: '',
      testSubtitleText: '',
      questions: null,
      seo: undefined,
    });
  }
}
