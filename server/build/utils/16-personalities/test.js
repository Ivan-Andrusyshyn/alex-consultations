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
