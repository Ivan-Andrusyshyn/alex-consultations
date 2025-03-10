import { Routes } from '@angular/router';

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
        path: 'details/:traumaticSensitivity',
        loadComponent: () =>
          import(
            './pages/traumatic-sensitivity/test-results/test-results.component'
          ).then((m) => m.TestResultsComponent),
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
        path: 'details/:traumaticSensitivity',
        loadComponent: () =>
          import(
            './pages/toxical-relationship/test-results/test-results.component'
          ).then((m) => m.TestResultsComponent),
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
    path: 'tests/16-personalities',
    loadComponent: () =>
      import('./pages/personalities-test/personalities-test.component').then(
        (m) => m.PersonalitiesTestComponent
      ),
    children: [
      {
        path: 'details/:personalitiesName',
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
