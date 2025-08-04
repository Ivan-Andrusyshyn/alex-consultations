import { Routes } from '@angular/router';

import { CountingClicksResolver } from './shared/resolvers/counting-clicks.resolver';
import { TestsResultsResolver } from './shared/resolvers/tests-results.resolver';
import { TestsQuestionsResolver } from './shared/resolvers/test-questions.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: { breadcrumb: 'Головна' },
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent
      ),
    data: { breadcrumb: 'Політика конфіденційності' },
  },
  {
    path: 'counting-clicks',
    resolve: { data: CountingClicksResolver },
    loadComponent: () =>
      import('./pages/counting-clicks/counting-clicks.component').then(
        (m) => m.CountingClicksComponent
      ),
    data: { breadcrumb: 'Тест кліків' },
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/courses/courses.component').then(
        (m) => m.CoursesComponent
      ),
    data: { breadcrumb: 'Курси' },
  },
  {
    path: 'consultations',
    loadComponent: () =>
      import('./pages/consultations/consultations.component').then(
        (m) => m.ConsultationsComponent
      ),
    data: { breadcrumb: 'Консультації' },
  },

  {
    path: 'tests',
    loadComponent: () =>
      import('./pages/tests/tests.component').then((m) => m.TestsComponent),
    data: { breadcrumb: 'Тести' },
  },

  {
    path: 'tests/:testName',
    data: { breadcrumb: 'Тести' },

    children: [
      {
        path: 'payment-success',
        loadComponent: () =>
          import(
            './pages/payment/payment-success/payment-success.component'
          ).then((m) => m.PaymentSuccessComponent),
        data: { breadcrumb: 'hidden' },
      },
      {
        path: 'questions',
        loadComponent: () =>
          import('./pages/test-questions/test-questions.component').then(
            (r) => r.TestQuestionsComponent
          ),
        resolve: { data: TestsQuestionsResolver },
        data: { scrollToTop: true, breadcrumb: 'dynamic' },
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
          breadcrumb: 'dynamic',
        },
      },
    ],
  },
  {
    path: 'tests/be-yourself',
    loadComponent: () =>
      import('./pages/be-yourself/be-yourself.component').then(
        (m) => m.BeYourselfComponent
      ),
    children: [
      {
        path: 'calculator',
        data: {
          scrollToTop: false,
          breadcrumb: 'Калькулятор відносин',
        },

        loadComponent: () =>
          import(
            './pages/be-yourself/calculator-relationships/calculator-relationships.component'
          ).then((m) => m.CalculatorRelationshipsComponent),
      },
      {
        path: 'calculator-information',
        loadComponent: () =>
          import(
            './pages/be-yourself/calculator-information/calculator-information.component'
          ).then((m) => m.CalculatorInformationComponent),
      },
    ],
  },
  {
    path: 'about',
    data: {
      scrollToTop: false,
      breadcrumb: 'Про нас',
    },
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contacts',
    data: {
      scrollToTop: false,
      breadcrumb: 'Контакти',
    },
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
