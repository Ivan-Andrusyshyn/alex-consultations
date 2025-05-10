type Category =
  | 'gentle-attractiveness'
  | 'wild-attractiveness'
  | 'warm-attractiveness'
  | 'intellectual-attractiveness'
  | 'charismatic-attractiveness'
  | 'mysterious-attractiveness';

interface AttractivenessResult {
  type: string;
  subtitle: string;
  category: Category;
  description: string;
  knownTraits: string[];
  hiddenTraits: string[];
  strengthBoosters: string[];
  keyPower: string;
  nextStep: string;
  callToAction: string;
}
type AttractivenessType =
  | '🔥 Харизматична'
  | '🖤 Загадкова'
  | '🧠 Інтелектуальна'
  | '🤍 Тепла'
  | '⚡ Дика'
  | '💫 Ніжна';

export { AttractivenessType, AttractivenessResult };
