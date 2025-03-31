interface Answer {
  point: number;
  text: string;
}
type Question = {
  id: number;
  question: string;
  answers: Answer[];
};
type RelationshipResult = {
  scoreRange: string;
  category: string;
  subtitle: string;
  description: string;
  recommendations: string[];
  conclusion: string;
  consultation: {
    text: string;
    buttonText: string;
  };
};
type CategoryName =
  | 'healthy-relationship'
  | 'toxic-relationship'
  | 'some-warning-signs'
  | 'very-dangerous-relationship'
  | 'unknown-type';

interface TestInformation {
  title: string;
  description: string;
  details: string[];
  benefits_title: string;
  benefits: string[];
  cta: {
    text: string;
    highlight: string;
  };
}

export { Answer, Question, CategoryName, TestInformation, RelationshipResult };
