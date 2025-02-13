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
    const findMaxMatch = (index = 0, bestMatch = null, bestMatchScore = 0) => {
        if (index >= resultsArray.length) {
            return bestMatch;
        }
        const result = resultsArray[index];
        const resultMap = parseResult(result);
        let matchCount = 0;
        const totalLetters = Object.keys(gradatedOrders).length;
        for (const letter in gradatedOrders) {
            if (gradatedOrders[letter] === resultMap[letter]) {
                matchCount++;
            }
        }
        const matchPercentage = Math.round((matchCount / totalLetters) * 100);
        if (matchPercentage > bestMatchScore) {
            bestMatch = result;
            bestMatchScore = matchPercentage;
        }
        console.log(index + 1, bestMatch, bestMatchScore);
        return findMaxMatch(index + 1, bestMatch, bestMatchScore);
    };
    return findMaxMatch();
};
exports.default = findBestRate;
