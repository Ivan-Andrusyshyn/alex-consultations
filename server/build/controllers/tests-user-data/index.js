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
exports.getAllTestsUserData = void 0;
//
const tests_user_data_1 = require("../../db/models/tests-user-data");
const getAllTestsUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield tests_user_data_1.TestsUserDataModel.find();
        return res.status(201).send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllTestsUserData = getAllTestsUserData;
