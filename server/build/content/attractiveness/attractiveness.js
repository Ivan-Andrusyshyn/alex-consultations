"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attractiveness = void 0;
exports.attractiveness = [
    {
        id: 1,
        question: 'Що люди зазвичай кажуть про тебе після знайомства?',
        answers: [
            {
                text: 'Ти дуже впевнений(а) у собі, це притягує!',
                type: 'charismatic-attractiveness',
            },
            {
                text: 'Ти загадка, хочеться дізнатися більше!',
                type: 'mysterious-attractivenes',
            },
            {
                text: 'З тобою цікаво говорити, ти розумний(а)!',
                type: 'intellectual-attractivenes',
            },
            {
                text: 'Ти випромінюєш тепло, з тобою спокійно!',
                type: 'warm-attractiveness',
            },
            { text: 'Ти заряджаєш своєю енергією!', type: 'wild-attractiveness' },
            { text: 'Ти дуже милий(а) і ніжний(а)!', type: 'gentle-attractiveness' },
        ],
    },
    {
        id: 2,
        question: 'Що найбільше привертає увагу до тебе?',
        answers: [
            {
                text: 'Моя впевненість у собі, це відчувається.',
                type: 'charismatic-attractiveness',
            },
            {
                text: 'Моя загадковість, мене хочеться розгадати.',
                type: 'mysterious-attractivenes',
            },
            {
                text: 'Мій розум і цікаві розмови.',
                type: 'intellectual-attractivenes',
            },
            { text: 'Моє тепло, з тобою добре.', type: 'warm-attractiveness' },
            { text: 'Моя енергія, я заряджаю людей!', type: 'wild-attractiveness' },
            { text: 'Моя ніжність і щирість.', type: 'gentle-attractiveness' },
        ],
    },
    {
        id: 3,
        question: 'Яке місце тобі найближче за відчуттями?',
        answers: [
            {
                text: 'Осяяна сцена, де всі погляди звернені на тебе.',
                type: 'charismatic-attractiveness',
            },
            {
                text: 'Старовинна бібліотека з книгами, що приховують таємниці.',
                type: 'mysterious-attractivenes',
            },
            {
                text: 'Затишна кав’ярня, де можна годинами говорити про сенс життя.',
                type: 'intellectual-attractivenes',
            },
            {
                text: 'Будинок друзів, де тебе зустрічають теплим обіймом.',
                type: 'warm-attractiveness',
            },
            {
                text: 'Шалена подорож у невідоме, коли вітер розвиває волосся.',
                type: 'wild-attractiveness',
            },
            {
                text: "М'який плед, приглушене світло й відчуття спокою.",
                type: 'gentle-attractiveness',
            },
        ],
    },
    {
        id: 4,
        question: 'Як ти зазвичай привертаєш увагу?',
        answers: [
            {
                text: 'Просто заходжу – і всі мене помічають',
                type: 'charismatic-attractiveness',
            },
            {
                text: ' Моя загадковість змушує людей цікавитися мною',
                type: 'mysterious-attractivenes',
            },
            {
                text: 'Люди слухають мене, бо я цікаво говорю',
                type: 'intellectual-attractivenes',
            },
            {
                text: 'Я випромінюю тепло, тому люди тягнуться до мене',
                type: 'warm-attractiveness',
            },
            {
                text: 'Я дію несподівано, і це зачаровує',
                type: 'wild-attractiveness',
            },
            {
                text: 'Моє спокійне і ніжне ставлення викликає симпатію ',
                type: 'gentle-attractiveness',
            },
        ],
    },
    {
        id: 5,
        question: 'Як ти реагуєш на компліменти?',
        answers: [
            {
                text: ' Усміхаюсь і кажу: ‘Знаю, дякую!',
                type: 'charismatic-attractiveness',
            },
            {
                text: 'Посміхаюсь загадково, нічого не відповідаю.',
                type: 'mysterious-attractivenes',
            },
            { text: 'Щиро дякую і радію!', type: 'intellectual-attractivenes' },
            { text: 'Моє тепло, з тобою добре.', type: 'warm-attractiveness' },
            { text: 'Жартую або кокетую у відповідь.', type: 'wild-attractiveness' },
            {
                text: 'Трохи червонію, але це приємно.',
                type: 'gentle-attractiveness',
            },
        ],
    },
    {
        id: 6,
        question: 'Як ти фліртуєш?',
        answers: [
            {
                text: 'Дивлюсь прямо в очі й впевнено посміхаюсь.',
                type: 'charismatic-attractiveness',
            },
            {
                text: 'Граю в загадковість, щоб хотілося мене розгадати.',
                type: 'mysterious-attractivenes',
            },
            {
                text: 'Захоплюю розмовою так, що неможливо відірватися.',
                type: 'intellectual-attractivenes',
            },
            {
                text: 'Буду уважним(ою) і дам відчути, що мені справді цікаво.',
                type: 'warm-attractiveness',
            },
            {
                text: 'Роблю щось несподіване, щоб змусити сміятися. ',
                type: 'wild-attractiveness',
            },
            {
                text: 'Червонію, відводжу погляд, але ніжно посміхаюсь.',
                type: 'gentle-attractiveness',
            },
        ],
    },
    {
        id: 7,
        question: 'Що ти робиш, коли заходиш у кімнату, повну людей?',
        answers: [
            {
                text: 'Одразу відчуваю себе головним(ою), і це помічають всі.',
                type: 'charismatic-attractiveness',
            },
            {
                text: 'Залишаюся осторонь, але люди все одно звертають увагу. ',
                type: 'mysterious-attractivenes',
            },
            {
                text: 'Швидко знаходжу цікаву тему, і всі починають слухати.',
                type: 'intellectual-attractivenes',
            },
            {
                text: 'Просто посміхаюсь і легко вливаюся в спілкування.',
                type: 'warm-attractiveness',
            },
            {
                text: 'Кидаю жарт або роблю щось несподіване, щоб привернути увагу. ',
                type: 'wild-attractiveness',
            },
            {
                text: 'Спокійно спостерігаю і відчуваю атмосферу.',
                type: 'gentle-attractiveness',
            },
        ],
    },
    {
        id: 8,
        question: 'Який фільм або серіал тобі ближче?',
        answers: [
            {
                text: ' "Вовк з Волл-стріт" – яскравість, впевненість, магнетизм. ',
                type: 'charismatic-attractiveness',
            },
            {
                text: '"Шерлок" – загадковість, спостережливість, інтелект.',
                type: 'mysterious-attractivenes',
            },
            {
                text: ' "Інтерстеллар" – глибина, філософія, великі питання.',
                type: 'intellectual-attractivenes',
            },
            {
                text: '"Друзі" – тепло, довіра, відчуття близькості.',
                type: 'warm-attractiveness',
            },
            {
                text: ' "Джон Вік" – дія, енергія, вибуховий характер. ',
                type: 'wild-attractiveness',
            },
            {
                text: ' "Амелі" – ніжність, чарівність, легкість.',
                type: 'gentle-attractiveness',
            },
        ],
    },
    {
        id: 9,
        question: 'В який момент ти відчуваєш, що світ належить тобі?',
        answers: [
            {
                text: ' Коли я заходжу в кімнату і відчуваю, що всі мене помітили.',
                type: 'charismatic-attractiveness',
            },
            {
                text: ' Коли я ловлю на собі зацікавлені погляди, але ніхто не може мене "прочитати".',
                type: 'mysterious-attractivenes',
            },
            {
                text: ' Коли мої слова або ідеї змушують людей задуматися.',
                type: 'intellectual-attractivenes',
            },
            {
                text: 'Коли я підтримую когось, і бачу, як змінюється їхній настрій.',
                type: 'warm-attractiveness',
            },
            {
                text: 'Коли я приймаю ризиковане рішення і воно виявляється правильним! ',
                type: 'wild-attractiveness',
            },
            {
                text: 'Коли я відчуваю, що мене люблять по-справжньому.',
                type: 'gentle-attractiveness',
            },
        ],
    },
    {
        id: 10,
        question: 'Що тобі найбільше хочеться, але не завжди вистачає сміливості зробити?',
        answers: [
            {
                text: ' Взяти ситуацію під контроль і змусити всіх слухати мене. ',
                type: 'charismatic-attractiveness',
            },
            {
                text: 'Не пояснювати себе, а просто залишатися загадкою.',
                type: 'mysterious-attractivenes',
            },
            {
                text: 'Розкрити свої ідеї повністю, навіть якщо вони здаються дивними.',
                type: 'intellectual-attractivenes',
            },
            {
                text: 'Стати для когось справжньою опорою, навіть якщо це важко. ',
                type: 'warm-attractiveness',
            },
            {
                text: 'Ризикнути всім і зробити щось абсолютно божевільне.',
                type: 'wild-attractiveness',
            },
            {
                text: ' Відкритися перед кимось повністю, не боячись бути вразливим(ою).',
                type: 'gentle-attractiveness',
            },
        ],
    },
];
