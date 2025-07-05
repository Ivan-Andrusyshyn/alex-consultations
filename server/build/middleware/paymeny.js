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
exports.paymentMiddleWare = void 0;
const paymentMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const testName = req.query.testName;
        const cookieKey = `${testName}-payment`;
        const rawData = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a[cookieKey];
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        if (!parsedData.invoiceId) {
            res.status(400).json({ message: 'invoiceId is not exist' });
        }
        req.body.paymentData = parsedData;
        next();
    }
    catch (error) {
        console.error('Check Status Payment Error:', error);
        res.status(500).json({ message: 'Error checking payment status', error });
    }
});
exports.paymentMiddleWare = paymentMiddleWare;
