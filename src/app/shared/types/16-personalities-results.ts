export interface PersonalityEntry {
  title: string;
  subtitle: string;
}

export interface Mirror {
  painPoints: string[];
  insight: string;
}

export interface Transformation {
  before: string;
  after: string;
}

export interface CTAblock {
  title: string;
  benefits: string[];
  buttonLabel: string;
}

export interface SocialProof {
  note: string;
  subNote: string;
}

export interface FooterEmotion {
  text: string;
  softCTA: string;
}

export interface TypeResultInformation {
  type: string;
  entry: PersonalityEntry;
  mirror: Mirror;
  transformation: Transformation;
  CTAblock: CTAblock;
  socialProof: SocialProof;
  footerEmotion: FooterEmotion;
}
