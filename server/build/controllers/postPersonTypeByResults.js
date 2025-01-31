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
const getPersonalityType_1 = __importDefault(require("../utils/personalities/getPersonalityType"));
const getInformationByType_1 = __importDefault(require("../utils/personalities/getInformationByType"));
const postPersonTypeByResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = req.body;
        console.log(results);
        const personType = (0, getPersonalityType_1.default)(results);
        const personInformation = (0, getInformationByType_1.default)(personType);
        res.status(200).send({
            personType,
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
