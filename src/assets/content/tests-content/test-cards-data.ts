const testCardsData = Object.freeze([
  {
    title: 'Який у тебе тип привабливості?',
    time: '(3хв ⏳)',
    cardClass: 'attractiveness-card',
    category: ['Всі тести', 'Для стосунків'],
    description: 'Дізнайся, що робить тебе по-справжньому привабливим!',
    testSvg: 'assets/svg/tests/attractiveness.svg',
    routeStart: '/tests/attractiveness/questions',
    routeInfo: '/tests/attractiveness/test-information',
  },
  {
    title: 'На токсичність стосунків ',
    time: '(3хв ⏳)',
    cardClass: 'toxical-card',
    category: ['Всі тести', 'Для особистого розвитку'],
    description: 'Перевір, чи твій партнер не токсичний.',
    testSvg: 'assets/svg/tests/worry-woman.svg',
    routeStart: '/tests/toxical-relationship/questions',
    routeInfo: '/tests/toxical-relationship/test-information',
  },
  {
    title: '16 типів особистості ',
    time: '(5хв ⏳)',
    cardClass: 'personality-card',
    category: ['Всі тести', 'Для особистого розвитку'],
    description:
      'Дізнайся свій унікальний тип особистості та розкрий свої сильні сторони!',
    testSvg: 'assets/svg/tests/16-personalities-card.svg',
    routeStart: '/tests/16-personalities/questions',
    routeInfo: '/tests/16-personalities/test-information',
  },
  {
    title: 'На травматичну чуттєвість ',
    time: '(7хв ⏳)',
    cardClass: 'traumatic-card',
    category: ['Всі тести', 'Для особистого розвитку'],
    description: 'Як сильно ти реагуєш на коментарі та зауваження?',
    testSvg: 'assets/svg/tests/pick-heart.svg',
    routeStart: '/tests/traumatic-sensitivity/questions',
    routeInfo: '/tests/traumatic-sensitivity/test-information',
  },
]);

export { testCardsData };
