"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const results_1 = require("../content/attractiveness/results");
class AttractiveneService {
    getResults(typeCategory) {
        return results_1.attractivenessResults.find((r) => r.category === typeCategory);
    }
    getNameCategoryByScore(scores) {
        let highestScore = -Infinity;
        let categories = [];
        const scoresArray = Object.keys(scores);
        for (let key of scoresArray) {
            const score = Number(scores[key]);
            if (score > highestScore) {
                highestScore = score;
                categories = [key];
            }
            else if (score === highestScore) {
                categories.push(key);
            }
        }
        if (categories.includes('charismatic-attractiveness')) {
            return 'charismatic-attractiveness';
        }
        else if (categories.includes('mysterious-attractiveness')) {
            return 'mysterious-attractiveness';
        }
        else if (categories.includes('intellectual-attractiveness')) {
            return 'intellectual-attractiveness';
        }
        else if (categories.includes('warm-attractiveness')) {
            return 'warm-attractiveness';
        }
        else if (categories.includes('wild-attractiveness')) {
            return 'wild-attractiveness';
        }
        else {
            return 'gentle-attractiveness';
        }
    }
}
const attractiveneService = new AttractiveneService();
exports.default = attractiveneService;
