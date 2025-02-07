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
const _16_personality_1 = __importDefault(require("../services/16-personality"));
const postPersonTypeByResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personType = req.body.personType;
        const personNameByType = _16_personality_1.default.getPersonNameByType(personType);
        const personInformation = _16_personality_1.default.getInformationByType(personNameByType);
        res.status(200).send({
            personType: personNameByType,
            personInformation,
            message: 'Success post person type .',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = postPersonTypeByResults;
