"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getNameCategoryByScore_1 = __importDefault(require("../controllers/toxical-relationships/getNameCategoryByScore"));
const getQuestions_1 = __importDefault(require("../controllers/toxical-relationships/getQuestions"));
const getDetailsCategory_1 = __importDefault(require("../controllers/toxical-relationships/getDetailsCategory"));
const getTestInformation_1 = __importDefault(require("../controllers/toxical-relationships/getTestInformation"));
const toxical_relationship_1 = require("../validators/toxical-relationship");
const relationshipRoute = (0, express_1.default)();
relationshipRoute.get('/toxical-relationships', getQuestions_1.default);
relationshipRoute.get('/toxical-relationships/information', getTestInformation_1.default);
relationshipRoute.post('/toxical-relationships/category', toxical_relationship_1.toxicalRelationshpsGetCategoryValidator, getNameCategoryByScore_1.default);
relationshipRoute.get('/toxical-relationships/results/:categoryName', getDetailsCategory_1.default);
exports.default = relationshipRoute;
