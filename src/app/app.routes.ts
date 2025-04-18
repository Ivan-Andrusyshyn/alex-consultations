import { Routes } from '@angular/router';

import { PersonalitiesTestResultResolver } from './shared/resolvers/personalities-test.resolver';
import { AttractivenessResultsResolver } from './shared/resolvers/attractiveness.resolver';
import { TraumaticSensitivityResultsResolver } from './shared/resolvers/traumetic-sensitivity/traumatic-sensitivity-results.resolver';
import { ToxicalRelationshipResultsResolver } from './shared/resolvers/toxical-relationship/toxical-relationship.resolver';
import { RoleInRelationshipsResultsResolver } from './shared/resolvers/role-in-relationships.resolver';
import { ToxicalRelationshipDescriptionResolver } from './shared/resolvers/toxical-relationship/toxical-relationship-description.resolver';
import { TraumaticSensitivityInformationResolver } from './shared/resolvers/traumetic-sensitivity/traumetic-sensitivity-information.resolver';
import { createTestRoutes } from './shared/utils/createTestRoutes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent
      ),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/courses/courses.component').then(
        (m) => m.CoursesComponent
      ),
  },
  {
    path: 'consultations',
    loadComponent: () =>
      import('./pages/consultations/consultations.component').then(
        (m) => m.ConsultationsComponent
      ),
  },
  {
    path: 'tests',
    loadComponent: () =>
      import('./pages/tests/tests.component').then((m) => m.TestsComponent),
  },
  ...createTestRoutes({
    basePath: 'tests/attractiveness',
    loadComponent: () =>
      import('./pages/attractiveness/attractiveness.component').then(
        (m) => m.AttractivenessComponent
      ),
    loadQuestions: () =>
      import('./pages/attractiveness/questions/questions.component').then(
        (m) => m.QuestionsComponent
      ),
    loadResults: () =>
      import('./pages/attractiveness/test-results/test-results.component').then(
        (m) => m.TestResultsComponent
      ),
    loadInformation: () =>
      import(
        './pages/attractiveness/test-information/test-information.component'
      ).then((m) => m.TestInformationComponent),
    resultsResolver: AttractivenessResultsResolver,
    informationResolver: null,
  }),

  ...createTestRoutes({
    basePath: 'tests/traumatic-sensitivity',
    loadComponent: () =>
      import(
        './pages/traumatic-sensitivity/traumatic-sensitivity.component'
      ).then((m) => m.TraumaticSensitivityComponent),
    loadQuestions: () =>
      import(
        './pages/traumatic-sensitivity/questions/questions.component'
      ).then((m) => m.QuestionsComponent),
    loadResults: () =>
      import(
        './pages/traumatic-sensitivity/test-results/test-results.component'
      ).then((m) => m.TestResultsComponent),
    loadInformation: () =>
      import(
        './pages/traumatic-sensitivity/test-information/test-information.component'
      ).then((m) => m.TestInformationComponent),
    resultsResolver: TraumaticSensitivityResultsResolver,
    informationResolver: TraumaticSensitivityInformationResolver,
  }),

  ...createTestRoutes({
    basePath: 'tests/toxical-relationship',
    loadComponent: () =>
      import(
        './pages/toxical-relationship/toxical-relationship.component'
      ).then((m) => m.ToxicalRelationshipComponent),
    loadQuestions: () =>
      import('./pages/toxical-relationship/questions/questions.component').then(
        (m) => m.QuestionsComponent
      ),
    loadResults: () =>
      import(
        './pages/toxical-relationship/test-results/test-results.component'
      ).then((m) => m.TestResultsComponent),
    loadInformation: () =>
      import(
        './pages/toxical-relationship/test-information/test-information.component'
      ).then((m) => m.TestInformationComponent),
    resultsResolver: ToxicalRelationshipResultsResolver,
    informationResolver: ToxicalRelationshipDescriptionResolver,
  }),
  ...createTestRoutes({
    basePath: 'tests/role-in-relationships',
    loadComponent: () =>
      import(
        './pages/role-in-relationships/role-in-relationships.component'
      ).then((m) => m.RoleInRelationshipsComponent),
    loadQuestions: () =>
      import(
        './pages/role-in-relationships/questions/questions.component'
      ).then((m) => m.QuestionsComponent),
    loadResults: () =>
      import(
        './pages/role-in-relationships/test-results/test-results.component'
      ).then((m) => m.TestResultsComponent),
    loadInformation: () =>
      import(
        './pages/role-in-relationships/test-information/test-information.component'
      ).then((m) => m.TestInformationComponent),
    resultsResolver: RoleInRelationshipsResultsResolver,
    informationResolver: null,
  }),

  {
    path: 'tests/16-personalities',
    loadComponent: () =>
      import('./pages/personalities-test/personalities-test.component').then(
        (m) => m.PersonalitiesTestComponent
      ),
    children: [
      {
        path: 'calculator',
        data: { scrollToTop: false },

        loadComponent: () =>
          import(
            './pages/personalities-test/calculator-relationships/calculator-relationships.component'
          ).then((m) => m.CalculatorRelationshipsComponent),
      },
      {
        path: 'calculator-information',
        loadComponent: () =>
          import(
            './pages/personalities-test/calculator-information/calculator-information.component'
          ).then((m) => m.CalculatorInformationComponent),
      },
      ...createTestRoutes({
        basePath: '',
        loadComponent: () =>
          import(
            './pages/personalities-test/personalities-test.component'
          ).then((m) => m.PersonalitiesTestComponent),
        loadQuestions: () =>
          import(
            './pages/personalities-test/questions/questions.component'
          ).then((m) => m.QuestionsComponent),
        loadResults: () =>
          import(
            './pages/personalities-test/test-results/test-results.component'
          ).then((m) => m.TestResultsComponent),
        loadInformation: () =>
          import(
            './pages/personalities-test/test-information/test-information.component'
          ).then((m) => m.TestInformationComponent),
        resultsResolver: PersonalitiesTestResultResolver,
        informationResolver: null,
      }),
    ],
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contacts/contacts.component').then(
        (m) => m.ContactsComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
