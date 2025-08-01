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
const be_yourself_phrases_1 = require("../../services/be-yourself-phrases");
const getDayPhrases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dayPhrases = be_yourself_phrases_1.personalitiesPhraseService.getAllDayPhrases();
        return res.send(Object.assign({ message: 'Success get phrases.' }, dayPhrases));
    }
    catch (error) {
        console.log(error);
        return res.status(400).send('Internal server error');
    }
});
exports.default = getDayPhrases;
