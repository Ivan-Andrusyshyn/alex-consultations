"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_benefit_consultation_1 = __importDefault(require("../controllers/consultations/get-benefit-consultation"));
const consultationRoute = (0, express_1.default)();
consultationRoute.get('/benefit', get_benefit_consultation_1.default);
exports.default = consultationRoute;
