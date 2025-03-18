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
interface TypeInformation {
  type: string;
  deviz: string;
  koronnaFraza: string;
  tvoyaSyla: string[];
  tvoyaTayemnytsya: string[];
  shchoBudeYakshchoNeZminyuvaty: string;
  yakUseZminytsyaKolyZrozumishSebe: string;
  temnyyBlyznyuk: {
    nazva: string;
    osoblyvosti: string[];
  };
  legendarnyyMoment: string;

  offer: {
    resume: string[];
    keyQuestions: string[];
    benefits: string[];
    subtitle: string;
    title: string;
  };
}

interface CalculatorResult {
  range: string;
  title: string;
  description: string;
  sections: {
    relationshipExplanation: {
      emotionalPerception: string;
      futureVision: string;
      lifeRhythm: string;
    };
    possibleDifficulties: string[];
    improvingRelationship: string[];
    conclusion: string;
  };
  reflection: string;
}

type Answer = { point: number; text: string };
type AnswerPoint = 1 | 2 | 3 | 4 | 5;

interface PersonalityTypes {
  type: string;
  name: string;
  urlImg: string;
  route: string;
}

interface PersonalityDayPhrases {
  personalityType: string;
  phrase: string;
}
interface UsersPhraseSubject extends PersonalityDayPhrases {
  userTypeName: string;
  typeAvatarUrl: string;
}
export {
  Answer,
  PersonalityDayPhrases,
  Question,
  AnswerPoint,
  TestResult,
  Dichotomy,
  TypeInformation,
  PersonalityTypes,
  UsersPhraseSubject,
  Personalities,
  CalculatorResult,
};
