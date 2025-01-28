type Dichotomy = 'EI' | 'SN' | 'TF' | 'JP';

interface Question {
  id: number;
  question: string;
  answers: any[];
  dichotomy: Dichotomy;
}

interface TestResult {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

type Answer = { point: number; text: string };
type AnswerPoint = 1 | 2 | 3 | 4 | 5;
export { Answer, Question, AnswerPoint, TestResult, Dichotomy };
