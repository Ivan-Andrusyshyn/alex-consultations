"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getPersonalitiesTest_1 = __importDefault(require("../controllers/getPersonalitiesTest"));
const getPersonalitiesAnswers_1 = __importDefault(require("../controllers/getPersonalitiesAnswers"));
const postPersonalitiesAnswers_1 = __importDefault(require("../controllers/postPersonalitiesAnswers"));
const getPersonalitiesResultOfTest_1 = __importDefault(require("../controllers/getPersonalitiesResultOfTest"));
const testsRouter = (0, express_1.default)();
testsRouter.get('/16-personalities', getPersonalitiesTest_1.default);
testsRouter.get('/16-personalities/buffer-answers', getPersonalitiesAnswers_1.default);
testsRouter.post('/16-personalities/buffer-answers', postPersonalitiesAnswers_1.default);
testsRouter.post('/16-personalities/results', getPersonalitiesResultOfTest_1.default);
exports.default = testsRouter;
