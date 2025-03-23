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
const google_sheets_1 = __importDefault(require("../../services/google-sheets"));
const cache_1 = __importDefault(require("../../services/cache"));
const loadAllFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileIds = [
            '1jR2ovHIRBxuW-TTHkft-THazgN38z1mz',
            '1MXEb0Grxn_KwhxDHhVdV_3OM6A68K2Jq',
            '1P-NtuxCfS3aXZd9JkKN4OqzB7-FPsJa1',
            '1uj1XQecNEmSBI1cJRINcBYJmTtBMj4sK',
            '1xW1qCjHAN-Ch_XjScmWttG9djWGpJw-n',
            '19G2C02YZy6llYCi6qzZfxWgldgRhDLOw',
            '1RMmsi-q2t341rvuslLjo-HbuHCvBGJOg',
            '1sy5WZO5q4ERIOZMeTLWdprLda9GTI0az',
        ];
        for (let i = 0; i < fileIds.length; i += 1) {
            (yield cache_1.default.getCache(fileIds[i], () => google_sheets_1.default.getDataGoogle(fileIds[i])));
        }
        res.status(200).send({
            message: 'Succesfull loaded files!',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send('Internal server error');
    }
});
exports.default = loadAllFiles;
