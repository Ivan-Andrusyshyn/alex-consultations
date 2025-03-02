interface ConsultationContent {
  title: string;
  subtitle: string;
  descriptions: string;
  results: {
    title: string;
    resultsDescription: string;
    items: Array<{
      heading: string;
      description: string;
    }>;
  };
  consultationProcess: {
    title: string;
    descriptions: string;
    steps: Array<{
      stepTitle: string;
      description: string;
    }>;
    sessionDuration: string;
    summaryText: string;
    confidentiality: string;
  };
  uniqueApproach: {
    title: string;
    description: string;
    options: string[];
    optionsDescription: string;
    extraDescription: string;
    elseDescription: string;
  };
  signUp: {
    title: string;
    extraTitle: string;
    description: string;
    instructions: string[];
  };
  successMessage: string;
}

export { ConsultationContent };
