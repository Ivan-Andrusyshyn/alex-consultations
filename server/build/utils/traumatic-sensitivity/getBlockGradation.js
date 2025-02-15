"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getBlockGradation = (score) => {
    if (score >= 0 && score <= 4) {
        return 1;
    }
    else if (score >= 5 && score <= 9) {
        return 2;
    }
    else if (score >= 10 && score <= 14) {
        return 3;
    }
    else if (score >= 15 && score <= 18) {
        return 4;
    }
};
exports.default = getBlockGradation;
