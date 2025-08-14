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
const be_yourself_1 = __importDefault(require("../../services/be-yourself"));
const cache_1 = __importDefault(require("../../services/cache"));
const google_sheets_1 = __importDefault(require("../../services/google-sheets"));
const google_file_ids_env_1 = require("../../utils/google-file-ids-env");
const tests_1 = require("../../validators/valid-categoryName/tests");
const getTypeByResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personType = req.params.personType;
        //
        if (!tests_1.personalitites.includes(personType)) {
            return res.status(400).send({
                message: 'Error invalid params',
            });
        }
        const personNameByType = be_yourself_1.default.getPersonNameByType(personType);
        // const personInformation =
        //   personalitiesService.getInformationByType(personNameByType);
        const fileId = google_file_ids_env_1.PERSONALITIES.RESULTS;
        const results = yield cache_1.default.getCache(fileId, () => google_sheets_1.default.getDataGoogle(fileId));
        const personInformation = results[personType];
        personInformation.title = personNameByType;
        res.status(200).send({
            personInformation,
            message: 'Success post person type .',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = getTypeByResults;
