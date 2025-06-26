"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_rating_1 = __importDefault(require("../controllers/star-rating/get-rating"));
const add_rating_1 = __importDefault(require("../controllers/star-rating/add-rating"));
const starRatingRoute = (0, express_1.default)();
starRatingRoute.get('/tests/:testName', get_rating_1.default);
starRatingRoute.post('/tests', add_rating_1.default);
exports.default = starRatingRoute;
