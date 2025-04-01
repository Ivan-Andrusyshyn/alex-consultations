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
exports.personalitiesCalculatorResultsValidator = void 0;
const common_validator_1 = require("./common-validator");
const personalitiesCalculatorResultsValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationRule = {
        personsTypes: 'required|array|size:2',
        'personsTypes.*': 'required|string|in:ISFJ,ISTJ,INFJ,INTJ,ISFP,ISTP,INFP,INTP,ESFJ,ESTJ,ENFJ,ENTJ,ESFP,ESTP,ENFP,ENTP',
        'userInformation.routeTracker': 'required|string',
        'userInformation.referrer': 'string|nullable',
        'userInformation.testName': 'required|string',
        'userInformation.timestamp': 'required|string',
        'userInformation.device': 'required|string',
    };
    return yield (0, common_validator_1.commonValidator)(req, res, next, validationRule);
});
exports.personalitiesCalculatorResultsValidator = personalitiesCalculatorResultsValidator;
