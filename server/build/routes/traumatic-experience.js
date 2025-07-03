"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getQuestions_1 = __importDefault(require("../controllers/traumatic-experience/getQuestions"));
const countPersonPercentages_1 = __importDefault(require("../controllers/traumatic-experience/countPersonPercentages"));
const getEmotionTypeByResults_1 = __importDefault(require("../controllers/traumatic-experience/getEmotionTypeByResults"));
const traumatic_experience_1 = require("../validators/traumatic-experience");
const getTestInformation_1 = __importDefault(require("../controllers/traumatic-experience/getTestInformation"));
const traumExperienceRouter = (0, express_1.default)();
traumExperienceRouter.post('/traumatic-experience/results', traumatic_experience_1.sensitivityGetDataValidator, countPersonPercentages_1.default);
traumExperienceRouter.get('/traumatic-experience', getQuestions_1.default);
traumExperienceRouter.get('/traumatic-experience/information', getTestInformation_1.default);
traumExperienceRouter.get('/traumatic-experience/emotion-type/:emotionType', getEmotionTypeByResults_1.default);
exports.default = traumExperienceRouter;
