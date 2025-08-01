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
exports.checkPaymentCookie = void 0;
//
const checkPaymentCookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const testName = req.query.testName;
    const invoiceId = req.query.invoiceId;
    try {
        if (invoiceId === 'unknown' || !testName) {
            return res.status(200).json({
                message: 'Error checking payment status. InvoiceId is not exist',
                status: 'failed',
            });
        }
        req.body.paymentData = {
            testName,
            invoiceId,
        };
        next();
    }
    catch (error) {
        console.error('Check Status Payment Error:', error);
        res.status(500).json({ message: 'Error checking payment status', error });
    }
});
exports.checkPaymentCookie = checkPaymentCookie;
