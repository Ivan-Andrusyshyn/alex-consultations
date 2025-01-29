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
Object.defineProperty(exports, "__esModule", { value: true });
const getPersonalitiesResultOfTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        const answers = req.body.answers;
        for (const [questionId, answer] of Object.entries(answers)) {
            const index = Number(questionId) - 1;
            const [points, letter] = answer.split('-');
            if (scores.hasOwnProperty(letter)) {
                scores[letter] += Number(points);
            }
        }
        console.log(scores);
        res.status(200).send({
            results: scores,
            message: 'Success get scores operation.',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send('Internal server error');
    }
});
exports.default = getPersonalitiesResultOfTest;
