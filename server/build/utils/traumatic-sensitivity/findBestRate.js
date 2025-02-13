"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findBestRate = (gradatedOrders, resultsArray) => {
    const parseResult = (result) => {
        const resultMap = {};
        result.split(' – ').forEach((pair) => {
            const [letter, value] = pair.match(/[A-Z]+|\d+/g) || [];
            if (letter && value) {
                resultMap[letter] = Number(value);
            }
        });
        return resultMap;
    };
    let bestMatch = null;
    let bestMatchScore = 0;
    for (const result of resultsArray) {
        const resultMap = parseResult(result);
        let matchCount = 0;
        const totalLetters = Object.keys(gradatedOrders).length;
        for (const letter in gradatedOrders) {
            if (gradatedOrders[letter] === resultMap[letter]) {
                matchCount++;
            }
        }
        const matchPercentage = (matchCount / totalLetters) * 100;
        if (matchPercentage > 50 && matchPercentage > bestMatchScore) {
            bestMatch = result;
            bestMatchScore = matchPercentage;
        }
    }
    return bestMatch;
};
exports.default = findBestRate;
