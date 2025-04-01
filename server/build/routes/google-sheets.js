"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postTestsResultGoogleSheet_1 = __importDefault(require("../controllers/google/google-sheets/postTestsResultGoogleSheet"));
const postRegistrationGoogleSheet_1 = __importDefault(require("../controllers/google/google-sheets/postRegistrationGoogleSheet"));
const getGoogleSheetData_1 = __importDefault(require("../controllers/google/google-sheets/getGoogleSheetData"));
const google_sheet_1 = require("../validators/google-sheet");
const googleSheetRouer = (0, express_1.default)();
googleSheetRouer.post('/tests-results/send', postTestsResultGoogleSheet_1.default);
googleSheetRouer.post('/registration/send', google_sheet_1.postRegistrationGoogleSheetValidator, postRegistrationGoogleSheet_1.default);
googleSheetRouer.get('/tests/data', getGoogleSheetData_1.default);
exports.default = googleSheetRouer;
