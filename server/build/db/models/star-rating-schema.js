"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarRatingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const starRatingSchema = new mongoose_1.default.Schema({
    testName: {
        type: String,
        enum: [
            'you-coffee',
            'be-yourself',
            'attractiveness',
            'traumatic-experience',
            'role-in-relationships',
            'toxical-relationship',
        ],
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    votes: {
        type: Number,
        default: 0,
    },
});
exports.StarRatingModel = mongoose_1.default.model('starRating', starRatingSchema);
