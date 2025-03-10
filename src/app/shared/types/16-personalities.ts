type Dichotomy = 'EI' | 'SN' | 'TF' | 'JP';

interface Question {
  id: number;
  question: string;
  answers: any[];
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
interface TypeInformation {
  type: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  perception: {
    intuition: string[];
    feelings: string[];
    spontaneity: string[];
    logic: string[];
  };
  relationships: {
    traits: string[];
  };
  career: {
    preferences: string[];
    bestFields: string[];
  };
  conclusion: string;
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
  TypeInformation,
  PersonalityTypes,
};
