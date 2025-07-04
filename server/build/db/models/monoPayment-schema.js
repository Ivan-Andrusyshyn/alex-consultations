"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    reference: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    amount: { type: Number },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});
exports.PaymentModel = (0, mongoose_1.model)('Payment', PaymentSchema);
