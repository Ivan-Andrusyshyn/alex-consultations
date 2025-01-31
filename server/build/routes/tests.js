"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getPersonalitiesTest_1 = __importDefault(require("../controllers/getPersonalitiesTest"));
const postPersonalitiesResultOfTest_1 = __importDefault(require("../controllers/postPersonalitiesResultOfTest"));
const postPersonTypeByResults_1 = __importDefault(require("../controllers/postPersonTypeByResults"));
const testsRouter = (0, express_1.default)();
testsRouter.get('/16-personalities', getPersonalitiesTest_1.default);
testsRouter.post('/16-personalities/results', postPersonalitiesResultOfTest_1.default);
testsRouter.post('/16-personalities/person-type', postPersonTypeByResults_1.default);
exports.default = testsRouter;
