"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findBestRate = (gradatedOrders, resultsArray) => {
    let bestMatch = null;
    let bestMatchScore = -Infinity;
    resultsArray.forEach((result) => {
        let matchScore = 0;
        let totalDifference = 0;
        const totalKeys = Object.keys(gradatedOrders).length;
        for (const key in gradatedOrders) {
            if (result[key] !== undefined) {
                const difference = Math.abs(gradatedOrders[key] - result[key]);
                totalDifference += difference;
                if (difference === 0) {
                    matchScore++;
                }
            }
        }
        const exactMatchPercentage = (matchScore / totalKeys) * 100;
        const differencePenalty = totalDifference / totalKeys;
        const finalScore = exactMatchPercentage - differencePenalty;
        if (finalScore > bestMatchScore) {
            bestMatch = result;
            bestMatchScore = finalScore;
        }
    });
    if (!bestMatch)
        return null;
    console.log(bestMatch);
    return `C${bestMatch.C} - E${bestMatch.E} - T${bestMatch.T} - W${bestMatch.W} - B${bestMatch.B} - F${bestMatch.F} - R${bestMatch.R}`;
};
exports.default = findBestRate;
