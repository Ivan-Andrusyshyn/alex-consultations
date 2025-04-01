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
exports.sensitivityGetDataValidator = void 0;
const common_validator_1 = require("./common-validator");
const sensitivityGetDataValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationRule = {
        answers: 'required',
        'answers.*': ['required', 'string', 'regex:/^[0-9]+(\\.[0-9]+)?-[a-z-]+$/'],
        'userInformation.routeTracker': 'required|string',
        'userInformation.referrer': 'string|nullable',
        'userInformation.testName': 'required|string',
        'userInformation.timestamp': 'required|string',
        'userInformation.device': 'required|string',
    };
    return yield (0, common_validator_1.commonValidator)(req, res, next, validationRule);
});
exports.sensitivityGetDataValidator = sensitivityGetDataValidator;
