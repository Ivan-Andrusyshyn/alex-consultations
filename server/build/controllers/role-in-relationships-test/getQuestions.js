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
const google_file_ids_env_1 = require("../../utils/google-file-ids-env");
const tests_data_schema_1 = require("../../db/models/tests-data-schema");
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = google_file_ids_env_1.ROLE_IN_RELATIONSHIPS.QUESTIONS;
        const roleInRelationshipsModel = (0, tests_data_schema_1.getUniversalModel)('role-in-relationships-questions');
        let data = yield roleInRelationshipsModel.find();
        if (!data || data.length === 0) {
            const questions = (yield google_sheets_1.default.getDataGoogle(fileId));
            yield roleInRelationshipsModel.create(questions);
            data = yield roleInRelationshipsModel.find();
        }
        //
        const normalizeId = data.map((i, index) => (Object.assign({ id: index + 1 }, i._doc)));
        res.status(200).send({
            message: 'Success get relationship-sensitivity questions!',
            questions: normalizeId,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = getQuestions;
