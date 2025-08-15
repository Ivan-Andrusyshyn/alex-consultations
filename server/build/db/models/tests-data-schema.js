"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniversalModel = getUniversalModel;
const mongoose_1 = __importDefault(require("mongoose"));
const universalSchema = new mongoose_1.default.Schema({
    createdAt: { type: Date, default: Date.now },
}, { strict: false });
universalSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
const models = {};
function getUniversalModel(modelName) {
    if (models[modelName]) {
        return models[modelName];
    }
    const model = mongoose_1.default.model(modelName, universalSchema);
    models[modelName] = model;
    return model;
}
