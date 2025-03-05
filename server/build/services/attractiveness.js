"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const results_1 = require("../content/attractiveness/results");
class AttractivenessService {
    getResults(typeCategory) {
        return results_1.attractivenessResults.find((r) => r.category === typeCategory);
    }
    getNameCategoryByScore(scores) {
        console.log(scores);
        const categoryCount = {};
        for (let key of Object.keys(scores)) {
            const category = scores[key];
            if (categoryCount[category]) {
                categoryCount[category]++;
            }
            else {
                categoryCount[category] = 1;
            }
        }
        console.log(categoryCount);
        let maxCount = -Infinity;
        let mostFrequentCategory = '';
        for (let category in categoryCount) {
            if (categoryCount[category] > maxCount) {
                maxCount = categoryCount[category];
                mostFrequentCategory = category;
            }
        }
        console.log(`Most frequent category: ${mostFrequentCategory.replace(/^1-/, '')}`);
        return mostFrequentCategory.replace(/^1-/, '');
    }
}
const attractivenessService = new AttractivenessService();
exports.default = attractivenessService;
