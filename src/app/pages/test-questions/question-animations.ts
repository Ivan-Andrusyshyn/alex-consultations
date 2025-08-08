import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInQuestionAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('800ms ease-out', style({ opacity: 1 })),
  ]),
]);
