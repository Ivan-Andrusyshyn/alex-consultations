"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _16_personality_1 = require("../content/16-personality/16-personality");
const addTypesInTestQuestions = () => _16_personality_1.questionsPersonality.map((q) => {
    if ([3, 7, 18, 26, 35, 38, 43, 46, 59, 70, 75, 82].includes(q.id))
        return Object.assign(Object.assign({}, q), { dichotomy: 'EI' });
    if ([3, 7, 18, 26, 35, 38, 59, 70].includes(q.id))
        return Object.assign(Object.assign({}, q), { dichotomy: 'SN' });
    if ([4, 6, 21, 28, 40, 49, 57, 69, 77, 83].includes(q.id))
        return Object.assign(Object.assign({}, q), { dichotomy: 'TF' });
    if ([1, 5, 11, 14, 29, 45, 53, 64, 73, 90].includes(q.id))
        return Object.assign(Object.assign({}, q), { dichotomy: 'JP' });
    else
        return Object.assign(Object.assign({}, q), { dichotomy: 'EI' });
});
exports.default = addTypesInTestQuestions;
