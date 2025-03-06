interface Question {
  id: number;
  question: string;
  answers: Option[];
}

interface Option {
  text: string;
  type: PersonalityType;
  point?: string | number;
}
interface AttractivenessResult {
  type: string;
  title: string;
  category:
    | 'gentle-attractiveness'
    | 'wild-attractiveness'
    | 'warm-attractiveness'
    | 'intellectual-attractiveness'
    | 'charismatic-attractiveness'
    | 'mysterious-attractiveness';
  description: string;
  knownTraits: string[];
  hiddenTraits: string[];
  strengthBoosters: string[];
  keyPower: string;
  nextStep: string;
  callToAction: string;
}
type PersonalityType =
  | '🔥 Харизматична'
  | '🖤 Загадкова'
  | '🧠 Інтелектуальна'
  | '🤍 Тепла'
  | '⚡ Дика'
  | '💫 Ніжна';

export { Question, Option, PersonalityType, AttractivenessResult };
