"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amountQuestionsInType = (qlist) => {
    const letterCount = {
        EI: 0,
        SN: 0,
        TF: 0,
        JP: 0,
    };
    qlist.forEach((q) => {
        const types = new Set();
        q.answers.forEach((answer) => {
            if (['E', 'I'].includes(answer.type))
                types.add('EI');
            else if (['S', 'N'].includes(answer.type))
                types.add('SN');
            else if (['T', 'F'].includes(answer.type))
                types.add('TF');
            else if (['J', 'P'].includes(answer.type))
                types.add('JP');
        });
        types.forEach((type) => {
            letterCount[type] += 1;
        });
    });
    return letterCount;
};
exports.default = amountQuestionsInType;
