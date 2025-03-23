"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttractivenessService {
    getNameCategoryByScore(scores) {
        const categoryCount = {};
        for (let key of Object.keys(scores)) {
            const category = scores[key];
            const match = category.match(/^(\d+(\.\d+)?)-/);
            const numberPrefix = match ? parseFloat(match[1]) : 1;
            if (categoryCount[category]) {
                categoryCount[category] += numberPrefix;
            }
            else {
                categoryCount[category] = numberPrefix;
            }
        }
        let maxCount = -Infinity;
        let mostFrequentCategory = '';
        for (let category in categoryCount) {
            if (categoryCount[category] > maxCount) {
                maxCount = categoryCount[category];
                mostFrequentCategory = category;
            }
        }
        console.log(`Most frequent category: ${mostFrequentCategory.replace(/^\d+(\.\d+)?-/, '')}`);
        return mostFrequentCategory.replace(/^\d+(\.\d+)?-/, '');
    }
}
const attractivenessService = new AttractivenessService();
exports.default = attractivenessService;
