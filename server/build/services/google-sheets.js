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
function cleanString(value) {
    if (typeof value !== 'string') {
        return value;
    }
    const cleanedInput = value.replace(/\r\n/g, '').replace(/'/g, '"');
    try {
        return JSON.parse(cleanedInput);
    }
    catch (_a) {
        return cleanedInput;
    }
}
class GoogleSheetsService {
    getDataGoogle(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                const response = yield fetch(fileUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch the file');
                }
                return yield response.json();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    postRegistrationInfoOnSheet(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = new URLSearchParams();
            body.set('name', data.name);
            body.set('ip', data.ip);
            body.set('socialMedia', data.socialMedia);
            body.set('feedBack', (_a = data.feedBack) !== null && _a !== void 0 ? _a : '');
            if (data.phone) {
                body.set('phone', data.phone);
            }
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
                return data;
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
        });
    }
    postFeedBackOnSheet(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = new URLSearchParams();
            body.set('socialMedia', data.socialMedia);
            body.set('ip', data.ip);
            body.set('feedBack', data.feedBack);
            body.set('timestamp', data.timestamp);
            body.set('referrer', data.referrer);
            const scriptUrl = `${process.env.GOOGLE_SHEET_URL_FEEDBACK}`;
            try {
                const response = yield fetch(scriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: body.toString(),
                });
                const data = yield response.json();
                return data;
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
        });
    }
    getSheetData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scriptUrl = 'https://script.google.com/macros/s/AKfycbwsVYYR7Iqc84tDGoqjFhp0wwaS4oUlFb9Usb_AISzl0QIZL4FrXL-qunwTF9IC8Zuz/exec';
                const response = yield fetch(scriptUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                let data = yield response.json();
                const dataArray = Object.values(data[0]);
                const parseData = dataArray.map(cleanString);
                return parseData;
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
            body.set('referrer', data.referrer);
            body.set('routeTracker', data.routeTracker);
            if (['188.163.83.93', '46.211.80.251'].includes(data.ip)) {
                body.set('ip', 'ALEXANDER');
            }
            else if (['5.248.144.91', '::1'].includes(data.ip)) {
                body.set('ip', 'IVAN_DEV');
            }
            else {
                body.set('ip', data.ip);
            }
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
