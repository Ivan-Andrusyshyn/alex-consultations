import { CardContent } from '../../shared/models/tests/common-tests';
import { MainTestNames } from '../utils/testsNames';
import { MainTestPrices } from './testPrices';

export const TEST_CARDS: CardContent[] = [
  {
    time: '3 хв',
    category: 'Для особистого розвитку',
    routeStart: '/tests/' + MainTestNames.YouCoffee + '/questions',
    testPrice: MainTestPrices['YouCoffee'],
    title: 'Яка ти кава?',
    subtitle:
      'Відповідай на 12 простих, але смачних запитань — і дізнайся, яка кава ти всередині. Міцна? Кисленька? Чи, може, рідкісний сорт із власною легендою',
    buttonText: 'Почати тест',
    imgList: [1, 2, 3, 4, 5, 6],
    imgWebUrl:
      'https://drive.google.com/thumbnail?id=1ZBR_jivFgHw8--qddcChUANYAJKw-_Vv',
    imageUrl: 'assets/new/core/tests/' + MainTestNames.YouCoffee + '/',
  },
  {
    time: '5 хв',
    title: 'Бути собою',
    imgList: [1, 2, 3, 4, 5, 6, 7, 8],
    testPrice: MainTestPrices['BeYourself'],

    category: 'Для особистого розвитку',
    routeStart: '/tests/' + MainTestNames.BeYourself + '/questions',
    subtitle:
      'Дізнайся свій унікальний тип особистості та розкрий свої сильні сторони!',
    buttonText: 'Почати тест',
    imgWebUrl:
      'https://drive.google.com/thumbnail?id=1mRRT0zhXwOMEEhwBU9XEhVq3D3wv64X8',
    imageUrl: 'assets/new/core/tests/' + MainTestNames.BeYourself + '/',
  },

  {
    time: '3 хв',
    category: 'Для особистого розвитку',
    routeStart: '/tests/' + MainTestNames.Attractiveness + '/questions',
    title: 'Який у тебе тип привабливості?',
    testPrice: MainTestPrices['Attractiveness'],
    subtitle: 'Дізнайся, що робить тебе по-справжньому привабливим!',
    buttonText: 'Почати тест',
    imgList: [1, 2, 3, 4, 5, 6],
    imgWebUrl:
      'https://drive.google.com/thumbnail?id=10DdJ7b6soZH9WOGHn3Ma-ey9Wl1oA1JJ',
    imageUrl: 'assets/new/core/tests/' + MainTestNames.Attractiveness + '/',
  },
  {
    time: '3 хв',
    title: 'Яка твоя роль у стосунках?',
    imgList: [1, 2, 3, 4, 5],
    testPrice: MainTestPrices['RoleInRelationships'],
    category: 'Для стосунків',
    routeStart: '/tests/' + MainTestNames.RoleInRelationships + '/questions',
    subtitle: 'Краще зрозумій свою природну емоційність у відносинах.',
    buttonText: 'Почати тест',
    imgWebUrl:
      'https://drive.google.com/thumbnail?id=154SRuUwdrbIVM9XbN9YK4D4wQZbFG0Md',
    imageUrl:
      'assets/new/core/tests/' + MainTestNames.RoleInRelationships + '/',
  },
  {
    time: '1 хв',
    title: 'Калькулятор сумісності',
    category: 'Для стосунків',
    routeStart: '/tests/' + MainTestNames.BeYourself + '/calculator',
    testPrice: null,
    imgList: [1, 2, 3, 4, 5],
    subtitle: 'Дізнайтеся рівень гармонії ваших стосунків.',
    buttonText: 'Почати тест',
    imageUrl: 'assets/new/core/tests/personalities-calculator/',
  },
  {
    time: '7 хв',
    title: 'Тест на травматичний досвід',
    imgList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    testPrice: MainTestPrices['Traumatic'],
    category: 'Для особистого розвитку',
    routeStart: '/tests/' + MainTestNames.Traumatic + '/questions',
    subtitle: 'Як сильно ти реагуєш на коментарі та зауваження?',
    buttonText: 'Почати тест',
    imgWebUrl:
      'https://drive.google.com/thumbnail?id=19qOUY9o8rP6mLid81YhhLP4Q7yoPGVQK',
    imageUrl: 'assets/new/core/tests/' + MainTestNames.Traumatic + '/',
  },
  {
    time: '3 хв',
    title: 'На токсичність стосунків ',
    imgList: [1, 2, 3, 4],
    category: 'Для стосунків',
    routeStart: '/tests/' + MainTestNames.ToxicalRelationships + '/questions',
    testPrice: MainTestPrices['ToxicalRelationships'],
    subtitle: 'Перевір, чи твій партнер не токсичний.',
    buttonText: 'Почати тест',
    imgWebUrl:
      'https://drive.google.com/thumbnail?id=1zhiC3ygZHK6pWH-GSDWv7lnOv3J6bAIF',
    imageUrl:
      'assets/new/core/tests/' + MainTestNames.ToxicalRelationships + '/',
  },
];
