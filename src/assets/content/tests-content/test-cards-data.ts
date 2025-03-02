const testCardsData = Object.freeze([
  {
    title: 'Тест на токсичність стосунків ',
    time: '(3хв ⏳)',
    cardClass: 'toxical-card',
    description: 'Дізнайтеся, чи є у ваших стосунках тривожні сигнали.',
    testSvg: 'assets/svg/tests/worry-woman.svg',
    routeStart: '/tests/toxical-relationship/questions',
    routeInfo: '/tests/toxical-relationship/test-information',
  },
  {
    title: 'Тест 16 типів особистості ',
    time: '(11хв ⏳)',
    cardClass: 'personality-card',
    description: 'Дізнайся більше про себе, свої сильні та слабкі сторони.',
    testSvg: 'assets/svg/tests/16-personalities-card.svg',
    routeStart: '/tests/16-personalities/questions',
    routeInfo: '/tests/16-personalities/test-information',
  },
  {
    title: 'Тест на травматичну чуттєвість ',
    time: '(7хв ⏳)',
    cardClass: 'traumatic-card',
    description: 'Як сильно ти реагуєш на коментарі та зауваження?',
    testSvg: 'assets/svg/tests/pick-heart.svg',
    routeStart: '/tests/traumatic-sensitivity/questions',
    routeInfo: '/tests/traumatic-sensitivity/test-information',
  },
]);

export { testCardsData };
