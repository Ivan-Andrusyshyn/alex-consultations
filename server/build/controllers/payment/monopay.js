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
exports.setWebhook = exports.getWebhook = exports.clientInfo = exports.checkStatusPayment = exports.createPayment = void 0;
exports.generateReference = generateReference;
const crypto_1 = require("crypto");
//
const monopay_1 = require("../../services/monopay");
const mono_payment_schema_1 = require("../../db/models/mono-payment-schema");
const monoService = new monopay_1.MonoService();
const isProd = process.env.NODE_ENV === 'production';
// TEST CARD NUMBER 4444 3333 2222 1111
function generateReference() {
    return `inv-${(0, crypto_1.randomUUID)()}`;
}
//
// Check if the payment object is valid
const checkProperty = (res, monopaymentObject) => __awaiter(void 0, void 0, void 0, function* () {
    if (!monopaymentObject ||
        !monopaymentObject.amount ||
        !monopaymentObject.merchantPaymInfo) {
        return res.status(400).json({ message: 'Invalid payment data' });
    }
});
// const setCoockie = async (
//   res: Response,
//   status: string,
//   testName: TestName,
//   invoiceId: string
// ) => {
//   res.cookie(
//     testName + '-payment',
//     JSON.stringify({
//       invoiceId,
//       status,
//       testName,
//     }),
//     {
//       httpOnly: true,
//       secure: isProd,
//       sameSite: isProd ? 'none' : 'strict',
//       maxAge: 1000 * 60 * 60 * 3,
//     }
//   );
// };
// Create a payment
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reference = generateReference();
        const monopaymentObject = req.body;
        const amount = monopaymentObject.amount;
        const commentWithTestName = (_a = monopaymentObject.merchantPaymInfo) === null || _a === void 0 ? void 0 : _a.comment;
        //
        yield checkProperty(res, monopaymentObject);
        //
        monopaymentObject.merchantPaymInfo.reference = reference;
        const result = (yield monoService.createPayment(monopaymentObject));
        //
        // await setCoockie(res, 'created', commentWithTestName, result.invoiceId);
        res.json(Object.assign(Object.assign({}, result), { status: 'created', testName: commentWithTestName }));
    }
    catch (err) {
        console.error('Create Payment Error:', err);
        res.status(400).json({
            message: 'Create payment failed',
            error: err instanceof Error ? err.message : String(err),
        });
    }
});
exports.createPayment = createPayment;
//
const checkStatusPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceId, testName } = req.body.paymentData;
        const paymentDoc = yield mono_payment_schema_1.PaymentModel.findOne({ invoiceId });
        const result = yield monoService.statusPayment(invoiceId);
        if (result.status === 'success') {
            const now = new Date();
            if (!paymentDoc) {
                yield mono_payment_schema_1.PaymentModel.create({
                    invoiceId,
                    testName,
                    status: 'success',
                    paidAt: now,
                });
            }
            else if (paymentDoc.status !== 'success') {
                yield mono_payment_schema_1.PaymentModel.updateOne({ invoiceId }, {
                    $set: {
                        status: 'success',
                        paidAt: now,
                    },
                });
            }
        }
        const updatedDoc = yield mono_payment_schema_1.PaymentModel.findOne({ invoiceId });
        if ((updatedDoc === null || updatedDoc === void 0 ? void 0 : updatedDoc.status) === 'success') {
            const now = Date.now();
            const paidAt = updatedDoc.paidAt
                ? new Date(updatedDoc.paidAt).getTime()
                : 0;
            const TWO_HOURS = 1000 * 60 * 60 * 2;
            if (now - paidAt > TWO_HOURS) {
                return res.json({
                    invoiceId,
                    testName,
                    status: 'failed',
                    reason: 'Access expired',
                });
            }
            return res.json({
                invoiceId,
                status: 'success',
                testName,
            });
        }
        return res.json({
            invoiceId,
            status: result.status,
            testName,
        });
    }
    catch (error) {
        if (typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            error.code === 'ERR_BAD_REQUEST') {
            return res.status(203).json({
                status: 'failed',
                message: 'Bad request',
            });
        }
        else {
            return res
                .status(500)
                .json({ message: 'Error checking payment status', error });
        }
    }
});
exports.checkStatusPayment = checkStatusPayment;
const clientInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield monoService.getClientInfo();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: 'Mono API error', error });
    }
});
exports.clientInfo = clientInfo;
const getWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const body = req.body;
        const invoiceId = (_a = body === null || body === void 0 ? void 0 : body.data) === null || _a === void 0 ? void 0 : _a.invoiceId;
        if (!invoiceId)
            return res.status(400).send('No invoiceId');
        yield mono_payment_schema_1.PaymentModel.updateOne({ invoiceId }, { $set: { status: 'success' } });
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).json({ message: 'Mono API error', error });
    }
});
exports.getWebhook = getWebhook;
const setWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        const result = yield monoService.setWebhook(url);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Mono API error', error });
    }
});
exports.setWebhook = setWebhook;
