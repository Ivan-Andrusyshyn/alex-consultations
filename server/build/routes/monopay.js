"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monopay_1 = require("../controllers/payment/monopay");
const paymeny_middleware_1 = require("../middleware/paymeny.middleware");
const monoRouter = express_1.default.Router();
monoRouter.post('/create-payment', monopay_1.createPayment);
monoRouter.get('/check-status', paymeny_middleware_1.paymentMiddleWare, monopay_1.checkStatusPayment);
monoRouter.get('/client-info', monopay_1.clientInfo);
monoRouter.post('/set-webhook', monopay_1.setWebhook);
monoRouter.post('/get-webhook', monopay_1.getWebhook);
exports.default = monoRouter;
