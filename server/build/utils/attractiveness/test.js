"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionsAttractiveness = void 0;
const attractiveness_1 = require("../../content/attractiveness/attractiveness");
const getPointById = (id) => {
    if ([1, 6, 8].includes(id))
        return 1.5;
    else if ([10].includes(id))
        return 0.5;
    else
        return 1;
};
const createQuestionsAttractiveness = () => attractiveness_1.attractiveness.map((r) => ({
    id: r.id,
    question: r.question,
    answers: r.answers.map((s) => (Object.assign(Object.assign({}, s), { point: getPointById(r.id) }))),
}));
exports.createQuestionsAttractiveness = createQuestionsAttractiveness;
