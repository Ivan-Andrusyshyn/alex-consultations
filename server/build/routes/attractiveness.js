"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getQuestions_1 = __importDefault(require("../controllers/attractiveness/getQuestions"));
const getAttractivenessName_1 = __importDefault(require("../controllers/attractiveness/getAttractivenessName"));
const getInfoByCategory_1 = __importDefault(require("../controllers/attractiveness/getInfoByCategory"));
const attractiveness_1 = require("../validators/attractiveness");
const attractivenessRouter = (0, express_1.default)();
attractivenessRouter.get('/attractiveness', getQuestions_1.default);
attractivenessRouter.get('/attractiveness/category/:categoryName', getInfoByCategory_1.default);
attractivenessRouter.post('/attractiveness/category', attractiveness_1.attractivenessGetNameValidator, getAttractivenessName_1.default);
exports.default = attractivenessRouter;
