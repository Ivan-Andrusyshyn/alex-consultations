"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postEmail_1 = __importDefault(require("../controllers/postEmail"));
const mailerRouter = (0, express_1.default)();
mailerRouter.post('/', postEmail_1.default);
exports.default = mailerRouter;
