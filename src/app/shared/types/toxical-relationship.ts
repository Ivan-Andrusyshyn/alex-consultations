interface Answer {
  point: number;
  text: string;
}
type Question = {
  id: number;
  question: string;
  answers: Answer[];
};
type RelationshipResult = {
  scoreRange: string;
  category: string;
  subtitle: string;
  description: string;
  recommendations: string[];
  conclusion: string;
  consultation: {
    text: string;
    buttonText: string;
  };
};

export { Answer, Question, RelationshipResult };
