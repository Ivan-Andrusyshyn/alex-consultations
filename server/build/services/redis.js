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
const redis_1 = require("redis");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
//
class RedisService {
    constructor() {
        const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
        this.client = (0, redis_1.createClient)({ url: redisUrl });
        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client.isOpen) {
                yield this.client.connect();
                console.log('✅ Connected to Redis');
            }
        });
    }
    set(key, value, ttlSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const serialized = JSON.stringify(value);
            if (ttlSeconds) {
                yield this.client.set(key, serialized, { EX: ttlSeconds });
            }
            else {
                yield this.client.set(key, serialized);
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.get(key);
            return data ? JSON.parse(data) : null;
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.del(key);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.quit();
            console.log('❌ Disconnected from Redis');
        });
    }
}
exports.default = new RedisService();
