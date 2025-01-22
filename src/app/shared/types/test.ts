type Dichotomy = 'EI' | 'SN' | 'TF' | 'JP';

interface Question {
  id: number;
  question: string;
  dichotomy: Dichotomy;
}

interface TestResult {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
}

type Answer = { point: number; text: string };
type AnswerPoint = 1 | 2 | 3 | 4 | 5;
export { Answer, Question, AnswerPoint, TestResult, Dichotomy };
