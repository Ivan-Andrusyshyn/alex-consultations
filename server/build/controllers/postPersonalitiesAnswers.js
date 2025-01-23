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
exports.savedAnswersBuffer = void 0;
exports.savedAnswersBuffer = null;
const postPersonalitiesAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = req.body;
        exports.savedAnswersBuffer = Object.assign({}, answers);
        res.status(200).send({
            bufferData: exports.savedAnswersBuffer,
            message: 'Success post operation.',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = postPersonalitiesAnswers;
