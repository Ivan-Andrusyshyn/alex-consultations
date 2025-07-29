import { Question, TestName, TestResults } from './common-tests';

export interface TestInfo {
  testName: TestName;
  imgUrl: string;
  title: string;
  price: string | number;
  invoiceId: string;
}

export interface ResolveData {
  message: string | null;
  questions: Question[] | null;
  testName: TestName | null;
  testTitleText: string;
  testSubtitleText: string;
  testPrice: string | null;
  isSuccessPayedTest: boolean;
  isFreeTest: boolean;
  testInstruction?: {
    testTitle: string;
    instructionsTitle: string;
    steps: string[];
  };
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
}
export interface ResultsResolver {
  message: string | null;
  results: TestResults | null;
  personType?: string;
  testName: TestName | null;
  seo?: {
    title: string;
    metaTags: Array<string>;
  };
}
