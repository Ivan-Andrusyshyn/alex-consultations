"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _16_personality_1 = require("../../content/16-personality/16-personality");
const answersTypes_1 = __importDefault(require("./answersTypes"));
const limits = {
    TF: { typeName: 'TF', questionsLimit: 4 },
    PJ: { typeName: 'PJ', questionsLimit: 6 },
    JP: { typeName: 'JP', questionsLimit: 1 },
    IE: { typeName: 'IE', questionsLimit: 5 },
    SN: { typeName: 'SN', questionsLimit: 10 },
    NS: { typeName: 'NS', questionsLimit: 1 },
    FT: { typeName: 'FT', questionsLimit: 4 },
};
const getQuestionsByType = (type, score) => {
    var _a, _b;
    if (((_a = limits[type]) === null || _a === void 0 ? void 0 : _a.typeName) === type &&
        score[type] < ((_b = limits[type]) === null || _b === void 0 ? void 0 : _b.questionsLimit)) {
        score[type] += 1;
        return true;
    }
    else {
        return false;
    }
};
const typeMapping = {
    P: 'PJ',
    J: 'JP',
    I: 'IE',
    S: 'SN',
    N: 'NS',
    F: 'FT',
    T: 'TF',
};
const custumType = (typeLetter) => { var _a; return (_a = typeMapping[typeLetter]) !== null && _a !== void 0 ? _a : ''; };
const changeQuestionsById = (numberId) => {
    if (numberId === 1) {
        return 'Я часто детально розплановую свій день, перш ніж щось робити.';
    }
    if (numberId === 3) {
        return 'Коли я дізнаюся щось нове, я більше зосереджуюся на конкретних деталях, ніж на загальному баченні.';
    }
    if (numberId === 6) {
        return 'Приймаючи важливі рішення, я більше довіряю логіці, ніж почуттям.';
    }
    if (numberId === 10) {
        return 'Мені складно адаптуватися, якщо мій розклад раптово змінюється. ';
    }
    if (numberId === 13) {
        return 'Якщо я проводжу цілий день без спілкування, то ввечері у мене з’являється бажання поговорити з кимось, навіть без особливої причини.';
    }
    if (numberId === 15) {
        return ' Мені подобається працювати, коли є чіткий план і зрозумілі кроки, а не коли доводиться вирішувати все на ходу.';
    }
    if (numberId === 19) {
        return 'Я волію якнайшвидше ухвалити рішення, щоб закрити питання, а не залишати варіанти відкритими.';
    }
    if (numberId === 21) {
        return 'Я відчуваю себе комфортніше, коли маю чіткий план і дотримуюся його, а не коли дію спонтанно.';
    }
    if (numberId === 24) {
        return 'Мені легше працювати з загальними ідеями, можливостями та теоріями, ніж із конкретними фактами та деталями.';
    }
    if (numberId === 30) {
        return 'Мені дає більше енергії працювати за чітким планом, ніж діяти на ходу.';
    }
};
const addAnswersInTestQuestions = () => {
    var _a;
    const score = {
        PJ: 0,
        JP: 0,
        IE: 0,
        SN: 0,
        NS: 0,
        FT: 0,
        TF: 0,
    };
    const cutTestsArray = [];
    let numberId = 0;
    for (let i = 0; i < _16_personality_1.questionsPersonality.length; i++) {
        const qId = _16_personality_1.questionsPersonality[i].id;
        const option = (_a = (0, answersTypes_1.default)(qId)[1]) !== null && _a !== void 0 ? _a : { type: '' };
        const typeLetter = option.type;
        const finalType = custumType(typeLetter);
        if (getQuestionsByType(finalType, score)) {
            numberId += 1;
            if ([1, 3, 6, 10, 13, 15, 19, 21, 24, 30].includes(numberId)) {
                _16_personality_1.questionsPersonality[i].question = changeQuestionsById(numberId);
            }
            cutTestsArray.push({
                question: _16_personality_1.questionsPersonality[i].question,
                id: numberId,
                answers: (0, answersTypes_1.default)(qId),
            });
        }
    }
    return cutTestsArray;
};
exports.default = addAnswersInTestQuestions;
