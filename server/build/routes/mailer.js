"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _16_personalities_1 = __importDefault(require("../controllers/email/tests/16-personalities"));
const traumatic_sensitivity_1 = __importDefault(require("../controllers/email/tests/traumatic-sensitivity"));
const toxical_relationship_1 = __importDefault(require("../controllers/email/tests/toxical-relationship"));
const attractiveness_1 = __importDefault(require("../controllers/email/tests/attractiveness"));
const mailerRouter = (0, express_1.default)();
mailerRouter.post('/16-personalities', _16_personalities_1.default);
mailerRouter.post('/traumatic-sensitivity', traumatic_sensitivity_1.default);
mailerRouter.post('/toxical-relationship', toxical_relationship_1.default);
mailerRouter.post('/attractiveness', attractiveness_1.default);
exports.default = mailerRouter;
