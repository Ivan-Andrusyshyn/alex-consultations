"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//
const test_feedback_1 = require("../controllers/feedback/test-feedback");
//
const feedbackRouter = (0, express_1.default)();
feedbackRouter.post('/test', test_feedback_1.createTestFeedback);
feedbackRouter.get('/tests/feedbacks', test_feedback_1.getAllTestsFeedbacks);
exports.default = feedbackRouter;
