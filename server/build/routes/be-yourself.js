"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getQuestions_1 = __importDefault(require("../controllers/be-yourself/getQuestions"));
const getPercentages_1 = __importDefault(require("../controllers/be-yourself/getPercentages"));
const getTypeByResults_1 = __importDefault(require("../controllers/be-yourself/getTypeByResults"));
const getDayPhrases_1 = __importDefault(require("../controllers/be-yourself/getDayPhrases"));
const get_calculate_results_1 = __importDefault(require("../controllers/be-yourself/calculator/get-calculate-results"));
const get_calculator_information_1 = __importDefault(require("../controllers/be-yourself/calculator/get-calculator-information"));
const get_calculator_disclaimer_1 = __importDefault(require("../controllers/be-yourself/calculator/get-calculator-disclaimer"));
const be_yourself_1 = require("../validators/be-yourself");
const personalities_calculator_1 = require("../validators/personalities-calculator");
const beYourselfRouter = (0, express_1.default)();
beYourselfRouter.post('/be-yourself/results', be_yourself_1.beYourselfGetTypeValidator, getPercentages_1.default);
beYourselfRouter.post('/be-yourself/calculator', personalities_calculator_1.personalitiesCalculatorResultsValidator, get_calculate_results_1.default);
beYourselfRouter.get('/be-yourself/calculator-information', get_calculator_information_1.default);
beYourselfRouter.get('/be-yourself/calculator-disclaimer', get_calculator_disclaimer_1.default);
beYourselfRouter.get('/be-yourself', getQuestions_1.default);
beYourselfRouter.get('/be-yourself/person-type/:personType', getTypeByResults_1.default);
beYourselfRouter.get('/be-yourself/personalities-phrases', getDayPhrases_1.default);
exports.default = beYourselfRouter;
