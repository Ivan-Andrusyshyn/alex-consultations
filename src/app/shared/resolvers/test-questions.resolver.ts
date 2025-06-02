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
import { YouCoffeeService } from '../../core/services/you-coffee.service';

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
  ): Observable<{
    message: string | null;
    questions: Question[] | null;
    testName: string | null;
    testTitleText: string;
    testSubtitleText: string;
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
  }> {
    const testName = route.parent?.paramMap.get('testName');

    if (testName === 'role-in-relationships') {
      return this.roleInRelationshipsService.getQuestions().pipe(
        map((r) => {
          return {
            ...r,
            testName,
            testTitleText: 'Ти — опора, натхнення чи дзеркало для партнера?',
            testSubtitleText:
              'Цей тест покаже, як ти поводишся у близьких зв’язках і що несеш у життя іншої людини. Це дає глибоке усвідомлення себе у парі.',
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
            testTitleText:
              'Твій смак особистості — як кава: глибокий, іноді з гірчинкою, але завжди унікальний.',
            testSubtitleText:
              'Відповідай на 11 простих, але смачних запитань — і дізнайся, яка кава ти всередині. Міцна? Кисленька? Чи, може, рідкісний сорт із власною легендою?',
            seo: {
              title: 'Запитання | Яка ти кава | vidchuttia',
              metaTags: [
                'Відповідай на запитання тесту Яка ти кава, щоб дізнатися свій унікальний тип.',
                'тест, Яка ти кава, запитання, психологія, саморозвиток',
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
            testTitleText:
              'Пройшовши цей тест, ти відкриєш основу своєї особистості.',
            testSubtitleText:
              'Ці знання залишаться з тобою, навіть якщо ти вирішиш не записуватись на консультацію.',
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
            testTitleText:
              'Зрозумій, що саме в тобі найбільше притягує людей — емоційність, впевненість чи глибина?',
            testSubtitleText:
              'Цей тест допоможе побачити свої неочевидні сильні сторони в любові та дружбі. Те, що інші помічають, а ти — можливо, ні.',
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
            testTitleText:
              'Чи не виснажують тебе стосунки? А може, щось давно сигналить про проблему?',
            testSubtitleText:
              'Цей тест допоможе побачити сигнали токсичності, які легко ігнорувати. І дасть перший поштовх до чесного діалогу з собою.',
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
            testTitleText:
              'Як ти реагуєш на критику, непорозуміння чи образливі слова?',
            testSubtitleText:
              'Цей тест допоможе виявити свої вразливі місця — і зрозуміти, чи не живеш ти в режимі захисту. Це важливо, щоб побудувати здорові межі та зцілити себе.',
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
      testTitleText: '',
      testSubtitleText: '',
      questions: null,
      seo: undefined,
    });
  }
}
