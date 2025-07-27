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
//
class CacheService {
    constructor() {
        this.cache = {};
        this.cacheTTL = 8 * 60 * 60 * 1000;
    }
    getCache(key, fetchDataFn) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            if (this.cache[key] && now - this.cache[key].timestamp < this.cacheTTL) {
                return this.cache[key].data;
            }
            const data = yield fetchDataFn();
            this.cache[key] = { data, timestamp: now };
            return data;
        });
    }
}
const cacheService = new CacheService();
exports.default = cacheService;
