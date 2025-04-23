"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const clickSchema = new mongoose_1.default.Schema({
    socialMedia: {
        type: String,
        enum: ['telegram', 'instagram'],
        required: true,
    },
    amountClick: {
        type: Number,
        default: 0,
    },
});
exports.ClickModel = mongoose_1.default.model('Click', clickSchema);
