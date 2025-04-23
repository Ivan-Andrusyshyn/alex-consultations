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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// __dirname => build/services/clicks-data.json
class CounterService {
    constructor() {
        this.DATA_FILE = path_1.default.join(__dirname, 'clicks-data.json');
        this.clicksData = {};
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadData();
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield fs_extra_1.default.pathExists(this.DATA_FILE)) {
                    this.clicksData = yield fs_extra_1.default.readJson(this.DATA_FILE);
                }
                else {
                    this.clicksData = {
                        telegram: { amountClick: 0 },
                        instagram: { amountClick: 0 },
                    };
                    yield this.saveData();
                }
            }
            catch (err) {
                console.error('❌ Failed to load clicks data:', err);
            }
        });
    }
    saveData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_extra_1.default.writeJson(this.DATA_FILE, this.clicksData, { spaces: 2 });
            }
            catch (err) {
                console.error('❌ Failed to save clicks data:', err);
            }
        });
    }
    incrementClick(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clicksData[key]) {
                this.clicksData[key] = { amountClick: 1 };
            }
            else {
                this.clicksData[key].amountClick += 1;
            }
            yield this.saveData();
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
