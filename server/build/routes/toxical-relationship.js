"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getNameCategoryByScore_1 = __importDefault(require("../controllers/toxical-relationship/getNameCategoryByScore"));
const getQuestions_1 = __importDefault(require("../controllers/toxical-relationship/getQuestions"));
const getDetailsCategory_1 = __importDefault(require("../controllers/toxical-relationship/getDetailsCategory"));
const getTestInformation_1 = __importDefault(require("../controllers/toxical-relationship/getTestInformation"));
const toxical_relationship_1 = require("../validators/toxical-relationship");
const relationshipRoute = (0, express_1.default)();
relationshipRoute.get('/toxical-relationship', getQuestions_1.default);
relationshipRoute.get('/toxical-relationship/information', getTestInformation_1.default);
relationshipRoute.post('/toxical-relationship/category', toxical_relationship_1.toxicalRelationshpsGetCategoryValidator, getNameCategoryByScore_1.default);
relationshipRoute.get('/toxical-relationship/results/:categoryName', getDetailsCategory_1.default);
exports.default = relationshipRoute;
