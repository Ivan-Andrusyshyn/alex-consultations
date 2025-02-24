"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionsRelationship = void 0;
const relationship_sensitivity_1 = require("../../content/toxical-relationship/relationship-sensitivity");
const createQuestionsRelationship = () => relationship_sensitivity_1.relationshipSensitivityQu.map((r, i) => {
    return Object.assign(Object.assign({}, r), { answers: [
            {
                text: 'Ніколи',
                point: 0,
            },
            {
                text: 'Рідко',
                point: 1,
            },
            {
                text: 'Іноді',
                point: 2,
            },
            {
                text: 'Часто',
                point: 3,
            },
            {
                text: 'Завжди',
                point: 4,
            },
        ] });
});
exports.createQuestionsRelationship = createQuestionsRelationship;
