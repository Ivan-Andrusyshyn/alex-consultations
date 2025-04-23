"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const social_links_counter_1 = __importDefault(require("../controllers/counter/social-links-counter"));
const get_all_clicks_data_1 = __importDefault(require("../controllers/counter/get-all-clicks-data"));
const counterRoute = (0, express_1.default)();
counterRoute.post('/social-links', social_links_counter_1.default);
counterRoute.get('/social-links', get_all_clicks_data_1.default);
exports.default = counterRoute;
