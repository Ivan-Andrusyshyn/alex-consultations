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
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { testName, score } = req.body;
        if (!testName || typeof score !== 'number' || score < 1 || score > 5) {
            return res.status(400).json({ message: 'Invalid input' });
        }
        const existing = yield star_rating_schema_1.StarRatingModel.findOne({ testName });
        if (existing) {
            const totalScore = existing.rating * existing.votes + score;
            const newVotes = existing.votes + 1;
            existing.rating = totalScore / newVotes;
            existing.votes = newVotes;
            yield existing.save();
            return res.status(200).json({ rating: existing.rating, votes: newVotes });
        }
        else {
            const newDoc = yield star_rating_schema_1.StarRatingModel.create({
                testName,
                rating: score,
                votes: 1,
            });
            return res
                .status(201)
                .json({ rating: newDoc.rating, votes: newDoc.votes });
        }
    }
    catch (error) {
        console.error('addRating error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = addRating;
