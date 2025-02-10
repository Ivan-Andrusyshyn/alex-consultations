"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _16_personality_1 = require("../../content/16-personality/16-personality");
const answersTypes_1 = __importDefault(require("./answersTypes"));
const addAnswersInTestQuestions = () => _16_personality_1.questionsPersonality.map((q, i) => {
    return Object.assign(Object.assign({}, q), { answers: (0, answersTypes_1.default)(q.id) });
});
exports.default = addAnswersInTestQuestions;
