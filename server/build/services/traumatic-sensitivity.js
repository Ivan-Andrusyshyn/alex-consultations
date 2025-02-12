"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const personalitiesName_1 = __importDefault(require("../utils/16-personalities/personalitiesName"));
class TraumaticSensitivityService {
    constructor() {
        this.countPersonPercentages = (answers) => {
            const scores = { E: 0, T: 0, W: 0, R: 0, F: 0, B: 0 };
            let sensitivityRate = 0;
            for (const [questionId, answer] of Object.entries(answers)) {
                const [points, letter] = answer.split('-');
                if (scores.hasOwnProperty(letter)) {
                    sensitivityRate += Number(points);
                    scores[letter] += Number(points);
                }
            }
            const typePairs = [
                ['E', 'T'],
                ['W', 'B'],
                ['F', 'R'],
            ];
            const percentages = {};
            for (const [type1, type2] of typePairs) {
                const totalScore = scores[type1] + scores[type2];
                percentages[type1] =
                    totalScore > 0 ? Math.round((scores[type1] / totalScore) * 100) : 50;
                percentages[type2] = 100 - percentages[type1];
            }
            const { minScoreNumber, maxScoreNumber } = this.findTheSmallestAndBiggestNumber(scores);
            const sensitivityType = this.getTypeByAllScoresNumber(sensitivityRate);
            const sensitivityRateGrade = this.getSensitivityRateGrade(sensitivityRate);
            const blocksGradation = this.getBlockGradation(scores);
            const sensitivityGradation = `C${sensitivityRateGrade} – E${blocksGradation.E} – W${blocksGradation.W} – F${blocksGradation.F} – T${blocksGradation.T} – B${blocksGradation.B} – R${blocksGradation.R}`;
            return {
                percentages,
                scores,
                sensitivityGradation,
                sensitivityType,
                minScoreNumber,
                maxScoreNumber,
            };
        };
        this.getInformationByType = (type) => {
            var _a;
            return (_a = personalitiesName_1.default.get(type)) !== null && _a !== void 0 ? _a : null;
        };
    }
    getBlockGradation(scores) {
        const sensitivityGradation = {};
        for (const key in scores) {
            const score = scores[key];
            if (score >= 0 && score <= 4) {
                sensitivityGradation[key] = 1;
            }
            else if (score >= 5 && score <= 9) {
                sensitivityGradation[key] = 2;
            }
            else if (score >= 10 && score <= 14) {
                sensitivityGradation[key] = 3;
            }
            else if (score >= 15 && score <= 18) {
                sensitivityGradation[key] = 4;
            }
        }
        return sensitivityGradation;
    }
    getSensitivityRateGrade(sensitivityRate) {
        let sensitivityRateGrade;
        if (sensitivityRate >= 0 && sensitivityRate <= 17) {
            sensitivityRateGrade = 1;
        }
        else if (sensitivityRate >= 18 && sensitivityRate <= 35) {
            sensitivityRateGrade = 2;
        }
        else if (sensitivityRate >= 36 && sensitivityRate <= 53) {
            sensitivityRateGrade = 3;
        }
        else if (sensitivityRate >= 54 && sensitivityRate <= 71) {
            sensitivityRateGrade = 4;
        }
        else if (sensitivityRate >= 72 && sensitivityRate <= 89) {
            sensitivityRateGrade = 5;
        }
        else {
            sensitivityRateGrade = 6;
        }
        return sensitivityRateGrade;
    }
    getTypeByAllScoresNumber(allNumber) {
        if (allNumber <= 17) {
            return 'Незламна рівновага';
        }
        else if (allNumber >= 18 && allNumber <= 35) {
            return 'Спокійна адаптивність';
        }
        else if (allNumber >= 36 && allNumber <= 53) {
            return 'Чутлива гармонія';
        }
        else if (allNumber >= 54 && allNumber <= 71) {
            return 'Емоційний барометр';
        }
        else if (allNumber >= 72 && allNumber <= 89) {
            return 'Вразливе серце';
        }
        else if (allNumber >= 90 && allNumber <= 108) {
            return 'Скляна душа';
        }
        else {
            return 'Невідомий рівень';
        }
    }
    findTheSmallestAndBiggestNumber(scores) {
        const entries = Object.entries(scores);
        const minEntry = entries.reduce((min, entry) => entry[1] < min[1] ? entry : min);
        const maxEntry = entries.reduce((max, entry) => entry[1] > max[1] ? entry : max);
        return {
            minScoreNumber: `${[minEntry[0]]}- ${minEntry[1]}`,
            maxScoreNumber: `${[maxEntry[0]]}-${maxEntry[1]}`,
        };
    }
}
const traumaticSensitivityService = new TraumaticSensitivityService();
exports.default = traumaticSensitivityService;
