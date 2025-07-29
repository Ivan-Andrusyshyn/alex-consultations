type CategoryName =
  | 'healthy-relationship'
  | 'toxic-relationship'
  | 'some-warning-signs'
  | 'very-dangerous-relationship'
  | 'unknown-type';

interface TestInformation {
  title: string;
  description: string;
  details: string[];
  benefits_title: string;
  benefits: string[];
  cta: {
    text: string;
    highlight: string;
  };
}

export { CategoryName, TestInformation };
