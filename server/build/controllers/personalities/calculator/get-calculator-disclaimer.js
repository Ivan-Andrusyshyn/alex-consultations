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
const google_sheets_1 = __importDefault(require("../../../services/google-sheets"));
const cache_1 = __importDefault(require("../../../services/cache"));
const getPersonalitiesCalculatorDisclaimer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = '1P-NtuxCfS3aXZd9JkKN4OqzB7-FPsJa1';
        const calculatorDisclaimer = (yield cache_1.default.getCache(fileId, () => google_sheets_1.default.getDataGoogle(fileId)));
        res.status(200).send({
            message: 'Successful calculate!',
            calculatorDisclaimer: calculatorDisclaimer.disclaimer,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400);
    }
});
exports.default = getPersonalitiesCalculatorDisclaimer;
