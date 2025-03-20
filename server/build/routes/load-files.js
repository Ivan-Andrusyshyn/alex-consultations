"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loadAllFiles_1 = __importDefault(require("../controllers/load-files/loadAllFiles"));
const loadFilesRoute = (0, express_1.default)();
loadFilesRoute.get('/load-files', loadAllFiles_1.default);
exports.default = loadFilesRoute;
