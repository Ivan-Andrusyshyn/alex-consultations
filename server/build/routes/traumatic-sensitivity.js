"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getQuestions_1 = __importDefault(require("../controllers/traumatic-sensitivity/getQuestions"));
const getDataAndPercentages_1 = __importDefault(require("../controllers/traumatic-sensitivity/getDataAndPercentages"));
const getEmotionTypeByResults_1 = __importDefault(require("../controllers/traumatic-sensitivity/getEmotionTypeByResults"));
const traumatic_sensitivity_1 = require("../validators/traumatic-sensitivity");
const traumSensitivityRouter = (0, express_1.default)();
traumSensitivityRouter.post('/traumatic-sensitivity/results', traumatic_sensitivity_1.sensitivityGetDataValidator, getDataAndPercentages_1.default);
traumSensitivityRouter.get('/traumatic-sensitivity', getQuestions_1.default);
traumSensitivityRouter.get('/traumatic-sensitivity/emotion-type/:emotionType', getEmotionTypeByResults_1.default);
exports.default = traumSensitivityRouter;
