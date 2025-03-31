interface CalculatorInformation {
  title: string;
  description: string;
  sections: {
    howItWorks: {
      title: string;
      steps: string[];
    };
    benefits: {
      title: string;
      points: string[];
    };
    importance: {
      title: string;
      text: string;
    };
    callToAction: {
      text: string;
    };
  };
}
interface CalculatorDisclaimer {
  title: string;
  text: string;
  responsibility: string;
}
interface CalculatorResult {
  range: string;
  title: string;
  description: string;
  sections: {
    relationshipExplanation: {
      deepUnderstanding: string;
      stabilityAndComfort: string;
      desireForDepth: string;
    };
    possibleDifficulties: string[];
    improvingRelationship: string[];
    conclusion: string;
    reflection: string;
  };
}
export { CalculatorResult, CalculatorInformation, CalculatorDisclaimer };
