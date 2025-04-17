interface RoleInRelationshipsResult {
  type: RelationshipRoleType;
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
type RelationshipRoleType =
  | 'natchnennik'
  | 'opora'
  | 'vogon-i-viter'
  | 'tvorec'
  | 'kapitan'
  | 'vilne-serce';

export {
  RoleInRelationshipsInformation,
  RoleInRelationshipsResult,
  RelationshipRoleType,
};
