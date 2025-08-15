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
const google_sheets_1 = __importDefault(require("../../services/google-sheets"));
const google_file_ids_env_1 = require("../../utils/google-file-ids-env");
const tests_1 = require("../../validators/valid-categoryName/tests");
const tests_data_schema_1 = require("../../db/models/tests-data-schema");
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
        const fileId = google_file_ids_env_1.PERSONALITIES.RESULTS;
        const beYourSelfModel = (0, tests_data_schema_1.getUniversalModel)('be-yourself-results');
        let data = yield beYourSelfModel.find();
        if (!data || data.length === 0) {
            const googleResults = yield google_sheets_1.default.getDataGoogle(fileId);
            yield beYourSelfModel.create(googleResults);
            data = yield beYourSelfModel.find();
        }
        const results = data[0][personType];
        const personInformation = Object.assign({ title: personNameByType }, results);
        //
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
