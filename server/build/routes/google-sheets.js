"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postOnGoogleSheet_1 = __importDefault(require("../controllers/google-sheets/postOnGoogleSheet"));
const googleSheetRouer = (0, express_1.default)();
googleSheetRouer.post('/tests-results/send', postOnGoogleSheet_1.default);
exports.default = googleSheetRouer;
