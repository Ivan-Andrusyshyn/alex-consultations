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
const traumatic_sensitivity_1 = __importDefault(require("../../services/traumatic-sensitivity"));
const getEmotionTypeByResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emotionType = req.params.emotionType;
        console.log(emotionType);
        const result = traumatic_sensitivity_1.default.getReults(emotionType);
        res.status(200).send({
            information: result,
            message: 'Success post person type.',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = getEmotionTypeByResults;
