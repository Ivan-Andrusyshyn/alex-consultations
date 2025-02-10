"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traumatic_sensitivity_1 = require("../../content/traumatic-sensitivity/traumatic-sensitivity");
const createTraumaticSensitivityTest = () => traumatic_sensitivity_1.traumaticSensitivity.map((q, i) => {
    return Object.assign(Object.assign({}, q), { id: i + 1, answers: q.answers.map((answ, i) => ({
            text: answ,
            point: 4 - (i + 1),
            type: getTypeByQuestionBlock(q.block),
        })) });
});
function getTypeByQuestionBlock(block) {
    switch (block) {
        case 'Емоційна чутливість':
            return 'E';
        case 'Травматична чуттєвість':
            return 'T';
        case 'Чутливість до критики роботи':
            return 'W';
        case 'Чутливість до критики стосунків':
            return 'R';
        case 'Чутливість до критики сім’ї':
            return 'F';
        case 'Чутливість до критики тіла':
            return 'B';
        default:
            return '';
    }
}
exports.default = createTraumaticSensitivityTest;
