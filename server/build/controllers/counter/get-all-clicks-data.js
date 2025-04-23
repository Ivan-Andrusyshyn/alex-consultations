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
const counter_1 = __importDefault(require("../../services/counter"));
const getAllClicksData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield counter_1.default.init();
        const allClicksData = yield counter_1.default.getAllClicksData();
        console.log(allClicksData);
        res.status(200).send({
            message: 'Success!',
            allClicksData,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = getAllClicksData;
