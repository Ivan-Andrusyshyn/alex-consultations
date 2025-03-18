import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';

@Component({
  selector: 'app-calculator-information',
  standalone: true,
  imports: [TitleCardComponent, TestCardStartBtnComponent, NgIf, NgFor],
  templateUrl: './calculator-information.component.html',
  styleUrl: './calculator-information.component.scss',
})
export class CalculatorInformationComponent {
  imgUrl = 'assets/svg/tests/crossfit.svg';
  subtitleText = 'Дізнайтеся рівень гармонії ваших стосунків.';

  // -----------
  routeUrl = '/tests/16-personalities/calculator-relationships';

  titleText = 'Калькулятор сумісності';
  title = 'Калькулятор сумісності: дізнайтеся рівень гармонії ваших стосунків';
  description =
    'Цей інструмент допоможе вам краще зрозуміти, як ви та ваш партнер сприймаєте світ, приймаєте рішення та взаємодієте один з одним. Калькулятор ґрунтується на когнітивних функціях – тобто на тому, як люди думають, аналізують інформацію та ухвалюють рішення.';

  sections = {
    howItWorks: {
      title: 'Як це працює',
      steps: [
        'Ви вводите свій та партнерський тип особистості за системою 16 особистостей (MBTI).',
        'Якщо ви ще не знаєте свій тип, його можна визначити, пройшовши тест на 16 особистостей.',
        'Алгоритм аналізує когнітивні стилі та визначає рівень гармонії у стосунках.',
        'Ви отримуєте детальний розбір вашої взаємодії: що вас зближує, які аспекти можуть викликати труднощі та як зробити стосунки комфортнішими.',
      ],
    },
    benefits: {
      title: 'Що дає цей аналіз',
      points: [
        'Розуміння динаміки пари – ви побачите, чому вам легко або, навпаки, складно розуміти один одного.',
        'Практичні поради – ви отримаєте конкретні рекомендації, як покращити зв’язок і спілкування.',
        'Новий погляд на стосунки – навіть якщо результат не ідеальний, це не вирок, а можливість глибше усвідомити, як працює ваш союз.',
      ],
    },
    importance: {
      title: 'Чому це важливо',
      text: 'Сумісність – це не просто збіг характерів. Це про те, наскільки легко вам знаходити спільну мову та вирішувати питання разом. Цей калькулятор допоможе вам зрозуміти ключові відмінності та точки взаємодії, щоб зробити стосунки ще більш гармонійними.',
    },
    callToAction: {
      text: 'Дізнайтеся, як ви з партнером взаємодієте на рівні мислення та сприйняття світу. Введіть свої типи особистості та отримайте аналіз.',
    },
  };
}
