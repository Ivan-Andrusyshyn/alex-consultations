interface Benefit {
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  description: string;
}

interface BenefitConsultationData {
  title: string;
  description: string;
  targetAudience: string[];
  targetTitle: string;
  benefits: Benefit[];
  testimonial: Testimonial;
  note: string;
}
export { BenefitConsultationData };
