import { Routes } from '@angular/router';

import { CountingClicksResolver } from './shared/resolvers/counting-clicks.resolver';
import { TestsResultsResolver } from './shared/resolvers/tests-results.resolver';
import { TestsQuestionsResolver } from './shared/resolvers/test-questions.resolver';

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
    path: 'counting-clicks',
    resolve: { data: CountingClicksResolver },
    loadComponent: () =>
      import('./pages/counting-clicks/counting-clicks.component').then(
        (m) => m.CountingClicksComponent
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

  {
    path: 'tests/:testName',
    loadComponent: () =>
      import(
        './pages/role-in-relationships/role-in-relationships.component'
      ).then((m) => m.RoleInRelationshipsComponent),
    children: [
      {
        path: 'questions',
        loadComponent: () =>
          import('./pages/test-questions/test-questions.component').then(
            (r) => r.TestQuestionsComponent
          ),
        resolve: { data: TestsQuestionsResolver },
        data: { scrollToTop: true },
      },
      {
        path: 'details/:categoryName',
        loadComponent: () =>
          import('./pages/test-results/test-results.component').then(
            (r) => r.TestResultsComponent
          ),
        resolve: { data: TestsResultsResolver },
        data: {
          scrollToTop: true,
        },
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
