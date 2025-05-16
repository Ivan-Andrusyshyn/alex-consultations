import { Component } from '@angular/core';

import { ServiceCardComponent } from '../../service-card/service-card.component';

@Component({
  selector: 'app-our-service-cards',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './our-service-cards.component.html',
  styleUrl: './our-service-cards.component.scss',
})
export class OurServiceCardsComponent {
  cards = [
    {
      title: 'Тести',
      link: '/tests',
      subtitle: ' дізнайся більше про свою особистість та взаємодію з іншими.',
    },
    {
      title: 'Курси',
      link: '',
      subtitle:
        'глибші знання про мислення, емоції та стосунки у зручному форматі.',
    },
    {
      title: 'Індивідуальні консультації',
      link: '/consultations',
      subtitle:
        'якщо хочеш розібратися в собі глибше та отримати персональні поради',
    },
  ];
}
