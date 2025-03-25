interface Question {
  id: number;
  question: string;
  answers: Option[];
}
interface Option {
  text: string;
  type: string;
  point?: string | number;
}
interface RoleInRelationshipsResult {
  type: relationshipRoleType;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}
interface RoleInRelationshipsInformation {
  title: string;
  description: string;
  details: {
    questions_count: number;
    unlocks: string[];
    note: string;
    result: string;
  };
  cta: string;
}
type relationshipRoleType =
  | 'Натхненник'
  | 'Опора'
  | 'Вогонь і вітер'
  | 'Творець сенсів'
  | 'Капітан'
  | 'Вільне серце';

export {
  Question,
  RoleInRelationshipsInformation,
  RoleInRelationshipsResult,
  relationshipRoleType,
};
