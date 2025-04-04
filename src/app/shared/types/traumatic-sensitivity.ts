interface TestResult {
  E: number;
  T: number;
  W: number;
  R: number;
  F: number;
  B: number;
}
interface PersonalitiesResults {
  results: {
    scores: TestResult;
    percentages: TestResult;
    sensitivityType: string;
    minScoreNumber: string;
    maxScoreNumber: string;
    matchResults: string;
    originMatchResults: string;
  };
}

interface PersonalitiesResponse extends PersonalitiesResults {
  message: string;
}
interface TypeInformation {
  resultCode: string;
  description: string;

  insights: {
    title: string;
    text: string[];
  };

  strengths: {
    title: string;
    list: string[];
  };

  challenges: {
    title: string;
    list: string[];
  };

  recommendations: {
    title: string;
    list: string[];
  };

  retakeConditions: {
    title: string;
    list: string[];
  };

  summary: {
    title: string;
    text: string;
  };
}
interface TestInformation {
  sections: { title: string; items: string[] }[];
  conclusion: string;
}
export {
  TestResult,
  PersonalitiesResults,
  TypeInformation,
  PersonalitiesResponse,
  TestInformation,
};
