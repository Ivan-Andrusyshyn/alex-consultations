"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class GoogleSheetsService {
    postRegistrationInfoOnSheet(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = new URLSearchParams();
            body.set('name', data.name);
            body.set('email', data.email);
            body.set('phone', data.phone);
            body.set('interest', data.interest);
            const scriptUrl = `${process.env.GOOGLE_SHEET_URL_CONSULTATIONS}`;
            try {
                const response = yield fetch(scriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: body.toString(),
                });
                const data = yield response.json();
                console.log(data);
                return data;
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
        });
    }
    postTestResultsOnSheet(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = new URLSearchParams();
            body.set('testName', data.testName);
            body.set('results', data.results);
            body.set('timestamp', data.timestamp);
            body.set('device', data.device);
            const scriptUrl = `${process.env.GOOGLE_SHEET_URL_TESTS}`;
            try {
                const response = yield fetch(scriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: body.toString(),
                });
                const data = yield response.json();
                console.log(data);
                return data;
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
        });
    }
}
const googleSheetsService = new GoogleSheetsService();
exports.default = googleSheetsService;
