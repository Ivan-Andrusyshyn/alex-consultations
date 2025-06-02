"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getQuestions_1 = __importDefault(require("../controllers/you-coffee/getQuestions"));
const getInfoByCategory_1 = __importDefault(require("../controllers/you-coffee/getInfoByCategory"));
const getCategoryName_1 = __importDefault(require("../controllers/you-coffee/getCategoryName"));
const youcoffee = (0, express_1.default)();
youcoffee.get('/you-coffee', getQuestions_1.default);
youcoffee.get('/you-coffee/category/:categoryName', getInfoByCategory_1.default);
youcoffee.post('/you-coffee/category', getCategoryName_1.default);
exports.default = youcoffee;
