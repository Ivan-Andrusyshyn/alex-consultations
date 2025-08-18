"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//
const tests_user_data_1 = require("../controllers/tests-user-data");
const testUserDataRoute = (0, express_1.default)();
testUserDataRoute.get('/all', tests_user_data_1.getAllTestsUserData);
exports.default = testUserDataRoute;
