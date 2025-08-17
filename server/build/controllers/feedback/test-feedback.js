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
exports.getFeedbacksByTest = exports.getAllTestsFeedbacks = exports.createTestFeedback = void 0;
//
const feedback_schema_1 = require("../../db/models/feedback-schema");
const createTestFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { testName, message } = req.body;
        if (!testName || !message) {
            return res
                .status(400)
                .send({ message: 'testName and message requaired' });
        }
        console.log(testName, message);
        const newFeedback = new feedback_schema_1.FeedbackModel({ testName, message });
        yield newFeedback.save();
        return res
            .status(201)
            .send({ message: 'Success created', feedback: newFeedback });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
});
exports.createTestFeedback = createTestFeedback;
const getAllTestsFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield feedback_schema_1.FeedbackModel.find().sort({ createdAt: -1 });
        return res.status(200).send({ feedbacks });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
});
exports.getAllTestsFeedbacks = getAllTestsFeedbacks;
const getFeedbacksByTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { testName } = req.params;
        const feedbacks = yield feedback_schema_1.FeedbackModel.find({ testName }).sort({
            createdAt: -1,
        });
        return res.status(200).send({ feedbacks });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
});
exports.getFeedbacksByTest = getFeedbacksByTest;
