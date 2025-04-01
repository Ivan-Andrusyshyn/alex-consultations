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
exports.commonValidator = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
const commonValidator = (req, res, next, validationRule) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = new validatorjs_1.default(req.body, validationRule);
    if (validation.fails()) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors.all(),
        });
    }
    else {
        next();
    }
});
exports.commonValidator = commonValidator;
