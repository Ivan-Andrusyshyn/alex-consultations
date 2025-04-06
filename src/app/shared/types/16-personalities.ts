type Dichotomy = 'EI' | 'SN' | 'TF' | 'JP';

interface Question {
  id: number;
  question: string;
  answers: any[];
}
type Personalities =
  | 'ISFJ'
  | 'ISTJ'
  | 'INFJ'
  | 'INTJ'
  | 'ISFP'
  | 'ISTP'
  | 'INFP'
  | 'INTP'
  | 'ESFJ'
  | 'ESTJ'
  | 'ENFJ'
  | 'ENTJ'
  | 'ESFP'
  | 'ESTP'
  | 'ENFP'
  | 'ENTP';

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

interface PersonalityTypes {
  type: string;
  name: string;
  urlImg: string;
  route: string;
}

export {
  Answer,
  Question,
  AnswerPoint,
  TestResult,
  Dichotomy,
  PersonalityTypes,
  Personalities,
};
