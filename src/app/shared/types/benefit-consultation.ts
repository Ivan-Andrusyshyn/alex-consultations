interface Benefit {
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  numberOfPeople: number;
  description: string;
}

interface BenefitConsultationData {
  title: string;
  description: string;
  targetAudience: string[];
  benefits: Benefit[];
  testimonial: Testimonial;
  note: string;
}
export { BenefitConsultationData };
