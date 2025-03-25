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
const path_1 = __importDefault(require("path"));
const fileSistem_1 = __importDefault(require("../../services/fileSistem"));
const testPessingCounter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.join(process.cwd(), 'src', 'public', 'test-passing-quantity.json');
        const data = fileSistem_1.default.readJsonFile(filePath);
        res.status(201).send({ message: 'Tests pessing success writed!' });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = testPessingCounter;
