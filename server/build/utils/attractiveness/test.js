"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionsAttractiveness = void 0;
const attractiveness_1 = require("../../content/attractiveness/attractiveness");
const createQuestionsAttractiveness = () => attractiveness_1.attractiveness.map((r) => ({
    id: r.id,
    question: r.question,
    answers: r.answers.map((s) => (Object.assign(Object.assign({}, s), { point: 1 }))),
}));
exports.createQuestionsAttractiveness = createQuestionsAttractiveness;
