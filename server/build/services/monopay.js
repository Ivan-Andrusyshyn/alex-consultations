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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoService = void 0;
// src/server/services/mono.service.ts
const axios_1 = __importDefault(require("axios"));
const MONO_API = 'https://api.monobank.ua';
class MonoService {
    constructor() {
        // this.token = process.env['MONO_TOKEN'] || '';
        this.token = process.env['DEV_MONO_TOKEN'] || '';
        if (!this.token) {
            throw new Error('MONO_TOKEN is not set in environment variables');
        }
    }
    createPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${MONO_API}/api/merchant/invoice/create`, {
                method: 'POST',
                headers: {
                    'X-Token': this.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const error = yield res.text();
                throw new Error(`Failed to create payment: ${res.status} - ${error}`);
            }
            return yield res.json();
        });
    }
    getClientInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.get(`${MONO_API}/personal/client-info`, {
                headers: { 'X-Token': this.token },
            });
            return res.data;
        });
    }
    getStatement(account, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${MONO_API}/personal/statement/${account}/${from}/${to}`;
            const res = yield axios_1.default.get(url, {
                headers: { 'X-Token': this.token },
            });
            return res.data;
        });
    }
    setWebhook(webhookUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.post(`${MONO_API}/personal/webhook`, { webHookUrl: webhookUrl }, { headers: { 'X-Token': this.token } });
            return res.data;
        });
    }
}
exports.MonoService = MonoService;
