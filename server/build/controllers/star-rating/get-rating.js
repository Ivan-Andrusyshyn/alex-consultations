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
const star_rating_schema_1 = require("../../db/models/star-rating-schema");
const getRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testName = req.params.testName;
        console.log(testName);
        const ratingDoc = yield star_rating_schema_1.StarRatingModel.findOne({ testName });
        if (!ratingDoc) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        return res.status(200).json({
            rating: ratingDoc.rating,
            votes: ratingDoc.votes,
        });
    }
    catch (error) {
        console.error('getRating error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = getRating;
