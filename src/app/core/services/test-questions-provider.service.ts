import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { QuestionsPageContent } from '../content/QuestionsPageContent';
import { RoleInRelationshipsService } from './tests/role-in-relationships.service';
import { ToxicalRelationshipService } from './tests/toxical-relationship.service';
import { MainTestNames } from '../utils/testsNames';
import { TestName } from '../../shared/models/tests/common-tests';
import { AttractivenessService } from './tests/attractiveness.service';
import { BeYourselfTestService } from './tests/be-yourself.service';
import { YouCoffeeService } from './tests/you-coffee.service';
import { TraumaticExperienceService } from './tests/traumatic-experience.service';

@Injectable({ providedIn: 'root' })
export class TestQuestionsProvider {
  constructor(
    private youcoffeeService: YouCoffeeService,
    private roleInRelationshipsService: RoleInRelationshipsService,
    private attractivenessService: AttractivenessService,
    private beYourselfService: BeYourselfTestService,
    private traumaticExperienceService: TraumaticExperienceService,
    private toxicalRelationshipsService: ToxicalRelationshipService
  ) {}

  provideByTestName(testName: TestName) {
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
    } else {
      return of({
        message: 'Тест не знайдено',
        questions: null,
        testName: null,
        testTitleText: '',
        testSubtitleText: '',
        testPrice: null,
      });
    }
  }
}
