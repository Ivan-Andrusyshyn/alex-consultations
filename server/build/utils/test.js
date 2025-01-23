"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _16_personality_1 = require("../content/16-personality/16-personality");
const dichotomyMap = {
    EI: [
        1, 3, 7, 9, 15, 18, 19, 26, 33, 35, 37, 38, 43, 46, 48, 55, 59, 66, 70, 75,
        79, 82, 86, 89,
    ],
    SN: [
        2, 8, 10, 12, 16, 22, 23, 25, 30, 31, 36, 41, 50, 51, 56, 60, 61, 67, 71,
        72, 76, 78, 84, 88,
    ],
    TF: [
        4, 6, 11, 13, 17, 21, 24, 28, 32, 39, 40, 44, 47, 49, 52, 57, 63, 65, 69,
        77, 80, 83, 85, 87,
    ],
    JP: [5, 14, 20, 27, 29, 34, 42, 45, 53, 54, 58, 62, 64, 68, 73, 74, 81, 90],
};
const addTypesInTestQuestions = () => _16_personality_1.questionsPersonality.map((q) => {
    for (const [type, ids] of Object.entries(dichotomyMap)) {
        if (ids.includes(q.id)) {
            return Object.assign(Object.assign({}, q), { dichotomy: type });
        }
    }
});
exports.default = addTypesInTestQuestions;
