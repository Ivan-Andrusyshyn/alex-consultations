"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCategoryName_1 = __importDefault(require("../controllers/toxical-relationship/getCategoryName"));
const getQuestions_1 = __importDefault(require("../controllers/toxical-relationship/getQuestions"));
const getInfoByCategory_1 = __importDefault(require("../controllers/toxical-relationship/getInfoByCategory"));
const relationshipRoute = (0, express_1.default)();
relationshipRoute.get('/toxical-relationship', getQuestions_1.default);
relationshipRoute.post('/toxical-relationship/category', getCategoryName_1.default);
relationshipRoute.get('/toxical-relationship/results/:categoryName', getInfoByCategory_1.default);
exports.default = relationshipRoute;
