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
const click_schema_1 = require("../db/models/click-schema");
const sharedClicksData = {
    instagram: { amountClick: 0 },
    telegram: { amountClick: 0 },
};
class CounterService {
    constructor() {
        this.data = sharedClicksData;
    }
    incrementClick(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield click_schema_1.ClickModel.findOneAndUpdate({ socialMedia: key }, { $inc: { amountClick: 1 } }, { new: true, upsert: true });
            return { amountClick: updated.amountClick };
        });
    }
    getClickData(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield click_schema_1.ClickModel.findOne({ socialMedia: key });
            return result ? { amountClick: result.amountClick } : { amountClick: 0 };
        });
    }
    getAllClicksData() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield click_schema_1.ClickModel.find({});
            const data = {
                telegram: { amountClick: 0 },
                instagram: { amountClick: 0 },
            };
            for (const doc of results) {
                data[doc.socialMedia] = { amountClick: doc.amountClick };
            }
            return data;
        });
    }
}
const counterService = new CounterService();
exports.default = counterService;
