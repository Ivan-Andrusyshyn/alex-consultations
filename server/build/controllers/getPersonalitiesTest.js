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
const amountQuestionsInType_1 = __importDefault(require("../utils/personalities/amountQuestionsInType"));
const getPersonalitiesTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionsWithAnswers = (0, test_1.default)().slice(0, 4);
        const amountQuestions = (0, amountQuestionsInType_1.default)((0, test_1.default)());
        console.log(amountQuestions);
        res.status(200).send({
            questions: questionsWithAnswers,
            amountQuestionsInOnType: amountQuestions,
            message: 'Succesfull get all questions!',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = getPersonalitiesTest;
