"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const countPersonPercentages = (scores, answers, amountQuestions) => {
    for (const [questionId, answer] of Object.entries(answers)) {
        const index = Number(questionId) - 1;
        const [points, letter] = answer.split('-');
        if (scores.hasOwnProperty(letter)) {
            scores[letter] += Number(points);
        }
    }
    const typePairs = [
        ['E', 'I'],
        ['S', 'N'],
        ['T', 'F'],
        ['J', 'P'],
    ];
    const maxScoreOnOneAnswer = 3;
    const percentages = {};
    for (const [type1, type2] of typePairs) {
        const totalQuestions = amountQuestions[`${type1}${type2}`] || 0;
        if (totalQuestions > 0) {
            const maxScore = totalQuestions * maxScoreOnOneAnswer;
            percentages[type1] = Math.round((scores[type1] / maxScore) * 100) || 0;
            percentages[type2] = Math.round((scores[type2] / maxScore) * 100) || 0;
        }
    }
    return percentages;
};
exports.default = countPersonPercentages;
