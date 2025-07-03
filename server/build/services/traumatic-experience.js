"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const possibleVariablesArray_1 = __importDefault(require("../content/traumatic-sensitivity/possibleVariablesArray"));
const results_1 = require("../content/traumatic-sensitivity/results");
const findBestRate_1 = __importDefault(require("../utils/traumatic-experience/findBestRate"));
const getBlockGradation_1 = __importDefault(require("../utils/traumatic-experience/getBlockGradation"));
const getSensitivityRateGrade_1 = __importDefault(require("../utils/traumatic-experience/getSensitivityRateGrade"));
const getTypeByAllScoresNumber_1 = __importDefault(require("../utils/traumatic-experience/getTypeByAllScoresNumber"));
class TraumaticSensitivityService {
    constructor() {
        this.countPersonPercentages = (answers) => {
            const scores = { E: 0, T: 0, W: 0, B: 0, R: 0, F: 0 };
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
            const sensitivityRateGrade = (0, getSensitivityRateGrade_1.default)(sensitivityRate);
            const gradatedLetters = { C: sensitivityRateGrade };
            const percentages = {};
            for (const [type1, type2] of typePairs) {
                const totalScore = scores[type1] + scores[type2];
                percentages[type1] =
                    totalScore > 0 ? Math.round((scores[type1] / totalScore) * 100) : 50;
                percentages[type2] = (100 - percentages[type1]);
                gradatedLetters[type1] = (0, getBlockGradation_1.default)(scores[type1]);
                gradatedLetters[type2] = (0, getBlockGradation_1.default)(scores[type2]);
            }
            const { minScoreNumber, maxScoreNumber } = this.findTheSmallestAndBiggestNumber(scores);
            const sensitivityType = (0, getTypeByAllScoresNumber_1.default)(sensitivityRate);
            const matchResults = (0, findBestRate_1.default)(gradatedLetters, possibleVariablesArray_1.default);
            const originMatchResults = `C${sensitivityRateGrade}-E${gradatedLetters.E}-T${gradatedLetters.T}-W${gradatedLetters.W}-B${gradatedLetters.B}-F${gradatedLetters.F}-R${gradatedLetters.R}`;
            return {
                percentages,
                scores,
                matchResults,
                originMatchResults,
                sensitivityType,
                minScoreNumber,
                maxScoreNumber,
            };
        };
    }
    getReults(variableType) {
        const variablesResult = results_1.testResult;
        const r = variablesResult.find((r) => r.resultCode === variableType);
        return r;
    }
    findTheSmallestAndBiggestNumber(scores) {
        const entries = Object.entries(scores);
        const minEntry = entries.reduce((min, entry) => entry[1] < min[1] ? entry : min);
        const maxEntry = entries.reduce((max, entry) => entry[1] > max[1] ? entry : max);
        return {
            minScoreNumber: `${[minEntry[0]]}-${minEntry[1]}`,
            maxScoreNumber: `${[maxEntry[0]]}-${maxEntry[1]}`,
        };
    }
}
const traumaticSensitivityService = new TraumaticSensitivityService();
exports.default = traumaticSensitivityService;
