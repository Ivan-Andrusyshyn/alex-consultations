import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenefitsComponent {
  cards = [
    {
      title: 'Зрозумієш свої таланти',
      subtitle: 'дізнаєшся, у чому твоя природна сила і як її розвивати.',
      number: '1',
    },
    {
      title: 'Розберешся зі своїми бажаннями',
      subtitle: 'чого ти насправді хочеш і що приносить тобі задоволення.',
      number: '2',
    },
    {
      title: 'Навчишся використовувати свої сильні сторони',
      subtitle:
        'перестанеш боротися з собою і почнеш діяти так, як тобі комфортно.',
      number: '3',
    },
    {
      title: 'Дізнаєшся, що керує твоїми рішеннями',
      subtitle:
        'почнеш приймати їх усвідомлено, а не під впливом зовнішніх обставин.',
      number: '4',
    },
    {
      title: 'Розкриєш свої природні здібності у взаємодії з людьми',
      subtitle: 'навчишся будувати гармонійні стосунки без зайвих конфліктів.',
      number: '5',
    },
    {
      title: 'Почнеш краще розуміти інших',
      subtitle:
        'помічати, як мислять люди навколо, і спілкуватися без непорозумінь.',
      number: '6',
    },
    {
      title: 'Відкриєш новий рівень самопізнання',
      subtitle: 'нарешті побачиш чітку картину, чому ти саме ти.',
      number: '7',
    },
  ];
}
