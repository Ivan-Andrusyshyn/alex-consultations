interface SensitivityCategory {
  name: string;
  description: string;
  levels: { range: string; meaning: string }[];
}

const sensitivityTest: Record<string, SensitivityCategory> = Object.freeze({
  E: {
    name: 'Емоційна чутливість',
    description: 'Показує, наскільки ти глибоко переживаєш свої емоції.',
    levels: [
      {
        range: '0–25%',
        meaning:
          'Ти рідко відчуваєш сильні емоційні коливання, все сприймаєш спокійно.',
      },
      {
        range: '25–50%',
        meaning:
          'Емоції є, але ти їх контролюєш, вони не керують твоїм життям.',
      },
      {
        range: '50–75%',
        meaning:
          'Почуття відіграють важливу роль, але ти можеш з ними справлятися.',
      },
      {
        range: '75–100%',
        meaning:
          'Емоції сильно впливають на твоє життя, іноді важко їх стримувати.',
      },
    ],
  },
  T: {
    name: 'Травматична чутливість',
    description: 'Визначає, наскільки минулий досвід впливає на твої реакції.',
    levels: [
      {
        range: '0–25%',
        meaning: 'Минуле майже не має впливу, ти живеш тут і зараз.',
      },
      {
        range: '25–50%',
        meaning:
          'Деякі ситуації можуть нагадувати про старі переживання, але вони не визначають твої реакції.',
      },
      {
        range: '50–75%',
        meaning: 'Минулі події впливають на твій емоційний стан і рішення.',
      },
      {
        range: '75–100%',
        meaning:
          'Травматичний досвід глибоко закарбувався у твоїй свідомості та впливає на теперішнє життя.',
      },
    ],
  },
  W: {
    name: 'Чутливість до критики роботи',
    description:
      'Показує, наскільки тобі важливе схвалення у професійній сфері.',
    levels: [
      {
        range: '0–25%',
        meaning: 'Критика не зачіпає, ти впевнений у своїх навичках.',
      },
      {
        range: '25–50%',
        meaning:
          'Ти сприймаєш зауваження, але не дозволяєш їм впливати на самооцінку.',
      },
      {
        range: '50–75%',
        meaning: 'Зауваження щодо роботи зачіпають тебе, ти прагнеш визнання.',
      },
      {
        range: '75–100%',
        meaning:
          'Критика роботи може сильно вдарити по самооцінці, викликати сумніви та тривогу.',
      },
    ],
  },
  B: {
    name: 'Чутливість до критики тіла',
    description:
      'Визначає, наскільки тобі важливо, як сприймають твою зовнішність.',
    levels: [
      {
        range: '0–25%',
        meaning: 'Ти байдужий до чужих оцінок своєї зовнішності.',
      },
      {
        range: '25–50%',
        meaning:
          'Ти можеш зважати на думку інших, але маєш власне бачення краси.',
      },
      {
        range: '50–75%',
        meaning:
          'Коментарі щодо твоєї зовнішності зачіпають, можуть впливати на самооцінку.',
      },
      {
        range: '75–100%',
        meaning:
          'Ти дуже чутливий до оцінки зовнішності, можеш гостро реагувати на будь-які зауваження.',
      },
    ],
  },
  F: {
    name: 'Чутливість до думки сім’ї',
    description: 'Показує, наскільки важливе для тебе схвалення рідних.',
    levels: [
      {
        range: '0–25%',
        meaning: 'Ти приймаєш рішення незалежно від думки родини.',
      },
      {
        range: '25–50%',
        meaning: 'Тобі важлива підтримка сім’ї, але ти маєш власну позицію.',
      },
      {
        range: '50–75%',
        meaning: 'Думка рідних сильно впливає на твої рішення та самооцінку.',
      },
      {
        range: '75–100%',
        meaning:
          'Ти сильно залежиш від схвалення сім’ї, можеш відчувати провину чи тривогу, якщо тебе не підтримують.',
      },
    ],
  },
  R: {
    name: 'Чутливість до думки партнера',
    description:
      'Показує, як сильно на тебе впливають слова та дії коханої людини.',
    levels: [
      {
        range: '0–25%',
        meaning:
          'Ти відчуваєш себе самодостатнім у стосунках і не залежиш від думки партнера.',
      },
      {
        range: '25–50%',
        meaning:
          'Ти цінуєш думку партнера, але не дозволяєш їй визначати твою самооцінку.',
      },
      {
        range: '50–75%',
        meaning: 'Слова партнера мають сильний вплив на твій емоційний стан.',
      },
      {
        range: '75–100%',
        meaning:
          'Думка партнера визначає твою самооцінку та настрій, критика може сильно ранити.',
      },
    ],
  },
});

export { sensitivityTest, SensitivityCategory };
