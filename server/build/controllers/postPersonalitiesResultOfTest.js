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
const countPersonPercentages_1 = __importDefault(require("../utils/personalities/countPersonPercentages"));
const postPersonalitiesResultOfTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = req.body.answers;
        const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        const amountQuestions = (0, amountQuestionsInType_1.default)((0, test_1.default)());
        const percentages = (0, countPersonPercentages_1.default)(scores, answers, amountQuestions);
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
