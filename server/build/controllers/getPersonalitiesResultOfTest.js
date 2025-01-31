"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amountQuestionsInType_1 = __importDefault(require("../utils/personalities/amountQuestionsInType"));
const test_1 = __importDefault(require("../utils/personalities/test"));
const postPersonalitiesResultOfTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        const answers = req.body.answers;
        const amountQuestions = (0, amountQuestionsInType_1.default)((0, test_1.default)());
        console.log(amountQuestions);
        for (const [questionId, answer] of Object.entries(answers)) {
            const index = Number(questionId) - 1;
            const [points, letter] = answer.split('-');
            if (scores.hasOwnProperty(letter)) {
                scores[letter] += Number(points);
            }
        }
        const typePairs = [
            ['E', 'I'],
            ['S', 'N'],
            ['T', 'F'],
            ['J', 'P'],
        ];
        const maxScoreOnOneAnswer = 3;
        const percentages = {};
        for (const [type1, type2] of typePairs) {
            const totalQuestions = amountQuestions[`${type1}${type2}`] || 0;
            if (totalQuestions > 0) {
                const maxScore = totalQuestions * maxScoreOnOneAnswer;
                percentages[type1] = Math.round((scores[type1] / maxScore) * 100) || 0;
                percentages[type2] = Math.round((scores[type2] / maxScore) * 100) || 0;
            }
        }
        console.log(percentages);
        res.status(200).send({
            results: { scores, percentages },
            message: 'Success get scores operation.',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send('Internal server error');
    }
});
exports.default = postPersonalitiesResultOfTest;
