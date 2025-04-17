export type Answer = { point: number; text: string };
export interface Question {
  id: number;
  question: string;
  answers: Option[];
}
export interface Option {
  text: string;
  type: string;
  point?: string | number;
}
export type TestResultRequest = {
  answers: Answer[];
  userInformation: {
    testName: string;
    referrer: string;
    routeTracker: string;
    timestamp: string;
    device: string;
  };
};
