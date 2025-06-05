import { CardContent } from '../../app/shared/models/common-tests';

export const TEST_CARDS: CardContent[] = [
  {
    time: '5 хв',
    title: '16 типів особистості',
    imgList: [1, 2, 3, 4, 5, 6, 7, 8],

    category: 'Для особистого розвитку',
    routeStart: '/tests/16-personalities/questions',
    subtitle:
      'Дізнайся свій унікальний тип особистості та розкрий свої сильні сторони!',
    buttonText: 'Почати тест',
    imageUrl: 'assets/new/core/tests/16-personalities/',
  },
  // {
  //   time: '3 хв',
  //   category: 'Для особистого розвитку',
  //   routeStart: '/tests/you-coffee/questions',
  //   title: 'Яка ти кава?',
  //   subtitle:
  //     'Відповідай на 11 простих, але смачних запитань — і дізнайся, яка кава ти всередині. Міцна? Кисленька? Чи, може, рідкісний сорт із власною легендою',
  //   buttonText: 'Почати тест',
  //   imgList: [1, 2, 3, 4, 5, 6],
  //   imageUrl: 'assets/new/core/tests/you-coffee/',
  // },
  {
    time: '3 хв',
    category: 'Для особистого розвитку',
    routeStart: '/tests/attractiveness/questions',
    title: 'Який у тебе тип привабливості?',
    subtitle: 'Краще зрозумій свою природну емоційність у відносинах.',
    buttonText: 'Почати тест',
    imgList: [1, 2, 3, 4, 5, 6],
    imageUrl: 'assets/new/core/tests/attractiveness/',
  },
  {
    time: '3 хв',
    title: 'Яка твоя роль у стосунках?',
    imgList: [1, 2, 3, 4, 5],

    category: 'Для стосунків',
    routeStart: '/tests/role-in-relationships/questions',

    subtitle: 'Дізнайся, що робить тебе по-справжньому привабливим!',
    buttonText: 'Почати тест',
    imageUrl: 'assets/new/core/tests/role-in-relationships/',
  },
  {
    time: '1 хв',
    title: 'Калькулятор сумісності',
    category: 'Для стосунків',
    routeStart: '/tests/16-personalities/calculator',
    imgList: [1, 2, 3, 4, 5],

    subtitle: 'Дізнайтеся рівень гармонії ваших стосунків.',
    buttonText: 'Почати тест',
    imageUrl: 'assets/new/core/tests/personalities-calculator/',
  },
  {
    time: '7 хв',
    title: 'На травматичну чуттєвість',
    imgList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

    category: 'Для особистого розвитку',
    routeStart: '/tests/traumatic-sensitivity/questions',
    subtitle: 'Як сильно ти реагуєш на коментарі та зауваження?',
    buttonText: 'Почати тест',
    imageUrl: 'assets/new/core/tests/traumatic-sensitivity/',
  },
  {
    time: '3 хв',
    title: 'На токсичність стосунків ',
    imgList: [1, 2, 3, 4],

    category: 'Для стосунків',
    routeStart: '/tests/toxical-relationship/questions',
    subtitle: 'Перевір, чи твій партнер не токсичний.',
    buttonText: 'Почати тест',
    imageUrl: 'assets/new/core/tests/toxical-relationship/',
  },
];
