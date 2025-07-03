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
const cache_1 = __importDefault(require("../../services/cache"));
const google_sheets_1 = __importDefault(require("../../services/google-sheets"));
const google_file_ids_env_1 = require("../../utils/google-file-ids-env");
const tests_1 = require("../../validators/valid-categoryName/tests");
const getEmotionTypeByResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emotionType = req.params.emotionType;
        if (!tests_1.traumeticSensitivity.includes(emotionType)) {
            return res.status(400).send({
                message: 'Error invalid params',
            });
        }
        const fileId = google_file_ids_env_1.TRAUMATIC_EXPERIENCE.RESULTS;
        const googlefileData = yield cache_1.default.getCache(fileId, () => google_sheets_1.default.getDataGoogle(fileId));
        if (googlefileData) {
            const results = googlefileData[emotionType];
            res.status(200).send({
                message: 'Successfully get information by categoryName.',
                results,
            });
        }
        else {
            res.status(400).send({
                message: 'Error google file is undefinde or null!',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = getEmotionTypeByResults;
