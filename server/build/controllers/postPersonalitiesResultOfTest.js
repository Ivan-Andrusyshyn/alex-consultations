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
const test_1 = __importDefault(require("../utils/personalities/test"));
const _16_personality_1 = __importDefault(require("../services/16-personality"));
const postPersonalitiesResultOfTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = req.body.answers;
        const amountQuestions = _16_personality_1.default.amountQuestionsInType((0, test_1.default)());
        const { scores, percentages } = _16_personality_1.default.countPersonPercentages(answers, amountQuestions);
        console.log(scores);
        console.log(percentages);
        res.status(200).send({
            results: { scores, percentages },
            message: 'Success post scores operation.',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send('Internal server error');
    }
});
exports.default = postPersonalitiesResultOfTest;
