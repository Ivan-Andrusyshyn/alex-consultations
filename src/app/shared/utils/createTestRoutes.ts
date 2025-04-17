import { Routes } from '@angular/router';

type RouteOptions = {
  basePath: string;
  loadComponent: () => Promise<any>;
  loadQuestions: () => Promise<any>;
  loadResults: () => Promise<any>;
  loadInformation: () => Promise<any>;
  resultsResolver?: any;
  informationResolver?: any;
  scrollToTop?: boolean;
};

enum TestPage {
  Questions = 'questions',
  Details = 'details/:categoryName',
  Information = 'test-information',
}

export function createTestRoutes(options: RouteOptions): Routes {
  const {
    basePath,
    loadComponent,
    loadQuestions,
    loadResults,
    loadInformation,
    resultsResolver,
    informationResolver,
    scrollToTop = true,
  } = options;

  return [
    {
      path: basePath,
      loadComponent,
      children: [
        {
          path: TestPage.Questions,
          loadComponent: loadQuestions,
        },
        {
          path: TestPage.Details,
          loadComponent: loadResults,
          resolve: resultsResolver ? { data: resultsResolver } : {},
          data: { scrollToTop },
        },
        {
          path: TestPage.Information,
          loadComponent: loadInformation,
          resolve: informationResolver ? { data: informationResolver } : {},
        },
      ],
    },
  ];
}
