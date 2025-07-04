"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monopay_1 = require("../controllers/payment/monopay");
const monoRouter = express_1.default.Router();
monoRouter.post('/create-payment', monopay_1.createPayment);
monoRouter.get('/check-status', monopay_1.checkStatusPayment);
monoRouter.get('/client-info', monopay_1.clientInfo);
monoRouter.post('/set-webhook', monopay_1.setWebhook);
exports.default = monoRouter;
