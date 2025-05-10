interface PersonalityDayPhrases {
  personalityType: string;
  phrase: string;
}
interface UsersPhraseSubject extends PersonalityDayPhrases {
  userTypeName: string;
  typeAvatarUrl: string;
}
export { PersonalityDayPhrases, UsersPhraseSubject };
