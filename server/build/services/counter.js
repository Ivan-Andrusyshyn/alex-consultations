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
class CounterService {
    constructor() {
        this.clicksData = {
            instagram: { amountClick: 0 },
            telegram: { amountClick: 0 },
        };
    }
    incrementClick(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clicksData[key]) {
                this.clicksData[key] = { amountClick: 1 };
            }
            else {
                this.clicksData[key].amountClick += 1;
            }
            return this.clicksData[key];
        });
    }
    getClickData(key) {
        return this.clicksData[key] || { amountClick: 0 };
    }
    getAllClicksData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clicksData;
        });
    }
}
const counterService = new CounterService();
exports.default = counterService;
