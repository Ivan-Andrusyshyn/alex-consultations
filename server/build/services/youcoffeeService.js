"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YouCoffeeService {
    getNameCategoryByScore(anwers) {
        const categoryCount = {};
        for (let key of Object.keys(anwers)) {
            const category = anwers[key];
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
        const percentage = (maxCount / 12) * 100;
        return {
            categoryName: mostFrequentCategory.replace(/^\d+(\.\d+)?-/, ''),
            subCategoryName: this.getSubCategoryName(percentage),
        };
    }
    getSubCategoryName(value) {
        if (value <= 40) {
            return 'Слабо заварена';
        }
        if (value > 40 && value <= 60) {
            return 'Смак починає звучати';
        }
        if (value > 60 && value <= 80) {
            return 'Розкритий аромат';
        }
        if (value > 80) {
            return 'Фірмова подача';
        }
        else {
            return 'unknown';
        }
    }
}
const youCoffeeService = new YouCoffeeService();
exports.default = youCoffeeService;
