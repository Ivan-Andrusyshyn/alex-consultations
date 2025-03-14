"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getQuestions_1 = __importDefault(require("../controllers/personalities/getQuestions"));
const getPercentages_1 = __importDefault(require("../controllers/personalities/getPercentages"));
const getTypeByResults_1 = __importDefault(require("../controllers/personalities/getTypeByResults"));
const getTypeByScores_1 = __importDefault(require("../controllers/personalities/getTypeByScores"));
const getDayPhrases_1 = __importDefault(require("../controllers/personalities/getDayPhrases"));
const testsRouter = (0, express_1.default)();
testsRouter.get('/16-personalities', getQuestions_1.default);
testsRouter.post('/16-personalities/get-type', getTypeByScores_1.default);
testsRouter.post('/16-personalities/results', getPercentages_1.default);
testsRouter.get('/16-personalities/person-type/:personType', getTypeByResults_1.default);
testsRouter.get('/16-personalities/personalities-phrases/:personType', getDayPhrases_1.default);
exports.default = testsRouter;
