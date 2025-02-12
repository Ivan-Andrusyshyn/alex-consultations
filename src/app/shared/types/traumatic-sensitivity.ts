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
    sensitivityGradation: string;
  };
}

interface PersonalitiesResponse extends PersonalitiesResults {
  message: string;
}
export { TestResult, PersonalitiesResults, PersonalitiesResponse };
