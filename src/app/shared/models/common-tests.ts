export type Answer = { point: number; text: string };

export type TestName =
  | 'you-coffee'
  | 'be-yourself'
  | 'attractiveness'
  | 'traumatic-experience'
  | 'role-in-relationships'
  | 'toxical-relationships';

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
export type CardContent = {
  time: string;
  category: string;
  routeStart: string;
  testPrice: string | null;
  title: string;
  imgList: Array<number>;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
};

export interface TestResults {
  type: string;
  title: string;
  category: string;
  subtitle: string;
  sections: Array<{
    sectionsName: string;
    sectionsDescription: string;
    sectionsList: string[];
  }>;
}
