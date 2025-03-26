import { Routes } from '@angular/router';
import { PersonalitiesTestResolver } from './shared/resolvers/personalities-test.resolver';
import { AttractivenessResultsResolver } from './shared/resolvers/attractiveness.resolver';
import { TraumaticSensitivityResultsResolver } from './shared/resolvers/traumatic-sensitivity.resolver';
import { ToxicalRelationshipResultsResolver } from './shared/resolvers/toxical-relationship.resolver';
import { RoleInRelationshipsResultsResolver } from './shared/resolvers/role-in-relationships.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
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

  {
    path: 'tests/attractiveness',
    loadComponent: () =>
      import('./pages/attractiveness/attractiveness.component').then(
        (m) => m.AttractivenessComponent
      ),
    children: [
      {
        path: 'questions',
        loadComponent: () =>
          import('./pages/attractiveness/questions/questions.component').then(
            (m) => m.QuestionsComponent
          ),
      },
      {
        path: 'details/:categoryName',
        loadComponent: () =>
          import(
            './pages/attractiveness/test-results/test-results.component'
          ).then((m) => m.TestResultsComponent),
        resolve: { attractivenessData: AttractivenessResultsResolver },
        data: { scrollToTop: true },
      },
      {
        path: 'test-information',
        loadComponent: () =>
          import(
            './pages/attractiveness/test-information/test-information.component'
          ).then((m) => m.TestInformationComponent),
      },
    ],
  },
  {
    path: 'tests/traumatic-sensitivity',
    loadComponent: () =>
      import(
        './pages/traumatic-sensitivity/traumatic-sensitivity.component'
      ).then((m) => m.TraumaticSensitivityComponent),
    children: [
      {
        path: 'questions',
        loadComponent: () =>
          import(
            './pages/traumatic-sensitivity/questions/questions.component'
          ).then((m) => m.QuestionsComponent),
      },
      {
        path: 'details/:categoryName',
        loadComponent: () =>
          import(
            './pages/traumatic-sensitivity/test-results/test-results.component'
          ).then((m) => m.TestResultsComponent),
        resolve: {
          traumaticSensitivityData: TraumaticSensitivityResultsResolver,
        },
        data: { scrollToTop: true },
      },
      {
        path: 'test-information',
        loadComponent: () =>
          import(
            './pages/traumatic-sensitivity/test-information/test-information.component'
          ).then((m) => m.TestInformationComponent),
      },
    ],
  },
  {
    path: 'tests/toxical-relationship',
    loadComponent: () =>
      import(
        './pages/toxical-relationship/toxical-relationship.component'
      ).then((m) => m.ToxicalRelationshipComponent),
    children: [
      {
        path: 'questions',
        loadComponent: () =>
          import(
            './pages/toxical-relationship/questions/questions.component'
          ).then((m) => m.QuestionsComponent),
      },
      {
        path: 'details/:categoryName',
        loadComponent: () =>
          import(
            './pages/toxical-relationship/test-results/test-results.component'
          ).then((m) => m.TestResultsComponent),
        resolve: {
          toxicalRelationshipData: ToxicalRelationshipResultsResolver,
        },
        data: { scrollToTop: true },
      },
      {
        path: 'test-information',
        loadComponent: () =>
          import(
            './pages/toxical-relationship/test-information/test-information.component'
          ).then((m) => m.TestInformationComponent),
      },
    ],
  },
  {
    path: 'tests/role-in-relationships',
    loadComponent: () =>
      import(
        './pages/role-in-relationships/role-in-relationships.component'
      ).then((m) => m.RoleInRelationshipsComponent),
    children: [
      {
        path: 'questions',
        loadComponent: () =>
          import(
            './pages/role-in-relationships/questions/questions.component'
          ).then((m) => m.QuestionsComponent),
      },
      {
        path: 'details/:categoryName',
        loadComponent: () =>
          import(
            './pages/role-in-relationships/test-results/test-results.component'
          ).then((m) => m.TestResultsComponent),
        resolve: {
          roleInRelationshipsData: RoleInRelationshipsResultsResolver,
        },
        data: { scrollToTop: true },
      },
      {
        path: 'test-information',
        loadComponent: () =>
          import(
            './pages/role-in-relationships/test-information/test-information.component'
          ).then((m) => m.TestInformationComponent),
      },
    ],
  },
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
      {
        path: 'details/:personalitiesName',
        resolve: { personalityData: PersonalitiesTestResolver },
        data: { scrollToTop: true },

        loadComponent: () =>
          import(
            './pages/personalities-test/test-results/test-results.component'
          ).then((m) => m.TestResultsComponent),
      },

      {
        path: 'questions',
        loadComponent: () =>
          import(
            './pages/personalities-test/questions/questions.component'
          ).then((m) => m.QuestionsComponent),
      },
      {
        path: 'test-information',
        loadComponent: () =>
          import(
            './pages/personalities-test/test-information/test-information.component'
          ).then((m) => m.TestInformationComponent),
      },
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
