"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const results_1 = require("../content/toxical-relationship/results");
class ToxicalRelationshipService {
    getResults(typeCategory) {
        return results_1.relationshipResults.find((r) => r.category === typeCategory);
    }
    getNameCategoryByScore(scores) {
        let score = 0;
        console.log(scores);
        const scoresArray = Object.keys(scores);
        for (let key of scoresArray) {
            score += Number(scores[key]);
        }
        if (score <= 10) {
            return 'Здорові стосунки';
        }
        else if (score >= 11 && score <= 25) {
            return 'Є тривожні сигнали';
        }
        else if (score >= 26 && score <= 40) {
            return 'Токсичні стосунки';
        }
        else if (score > 40) {
            return 'Дуже небезпечні стосунки';
        }
        else {
            return 'Невідомий тип';
        }
    }
}
const toxicalRelationshipService = new ToxicalRelationshipService();
exports.default = toxicalRelationshipService;
