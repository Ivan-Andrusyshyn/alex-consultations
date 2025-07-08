import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { QuestionsPageContent } from '../../core/content/QuestionsPageContent';
import { AttractivenessService } from '../../core/services/attractiveness.service';
import { BeYourselfTestService } from '../../core/services/be-yourself.service';
import { RoleInRelationshipsService } from '../../core/services/role-in-relationships.service';
import { ToxicalRelationshipService } from '../../core/services/toxical-relationship.service';
import { TraumaticExperienceService } from '../../core/services/traumatic-experience.service';
import { YouCoffeeService } from '../../core/services/you-coffee.service';
import { MainTestNames } from '../../core/utils/testsNames';
import { TestName } from '../models/common-tests';

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
