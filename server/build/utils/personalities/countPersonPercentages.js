"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const countPersonPercentages = (answers, amountQuestions) => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    for (const [questionId, answer] of Object.entries(answers)) {
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
            const totalScore = scores[type1] + scores[type2];
            percentages[type1] =
                totalScore > 0 ? Math.round((scores[type1] / totalScore) * 100) : 50;
            percentages[type2] = 100 - percentages[type1];
        }
    }
    return { percentages, scores };
};
exports.default = countPersonPercentages;
