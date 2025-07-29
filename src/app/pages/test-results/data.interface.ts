import { TestResults } from '../../shared/models/tests/common-tests';

export interface ResponseData {
  results: TestResults;
  message: string;
  testName: string;
  subCategoryCoffee?: string;
  seo: {
    title: string;
    metaTags: Array<string>;
  };
}
