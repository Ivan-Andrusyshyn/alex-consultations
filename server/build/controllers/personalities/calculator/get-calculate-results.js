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
const _16_personalities_calculator_1 = __importDefault(require("../../../services/16-personalities-calculator"));
const google_sheets_1 = __importDefault(require("../../../services/google-sheets"));
const google_file_ids_env_1 = require("../../../utils/google-file-ids-env");
const tests_data_schema_1 = require("../../../db/models/tests-data-schema");
const getPersonalitiesCalculatorResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { personsTypes, userInformation } = req.body;
        const ip = req.headers['x-forwarded-for']
            ? req.headers['x-forwarded-for'].split(',')[0].trim()
            : req.socket.remoteAddress || 'Unknown';
        const fileResultsId = google_file_ids_env_1.PERSONALITIES.CALCULATOR.RESULTS;
        // const calculateMatchesId = PERSONALITIES.CALCULATOR.IDS;
        // const results = await cacheService.getCache(fileResultsId, () =>
        //   googleSheetsService.getDataGoogle(fileResultsId)
        // );
        const resultsModel = (0, tests_data_schema_1.getUniversalModel)('personalities-calculator-results');
        const matchesModel = (0, tests_data_schema_1.getUniversalModel)('personalities-calculator-matches');
        const [resultsDoc, matchesDoc] = yield Promise.all([
            resultsModel.findOne(),
            matchesModel.findOne(),
        ]);
        if (!resultsDoc || !matchesDoc) {
            return res.status(500).json({ message: 'Data not found in database' });
        }
        const typesOfPair = `${personsTypes[0]}-${personsTypes[1]}`;
        const scoreResult = matchesDoc[typesOfPair];
        if (scoreResult) {
            const relationshipsType = _16_personalities_calculator_1.default.getTypeRelationshipByScore(scoreResult);
            yield google_sheets_1.default.postTestResultsOnSheet(Object.assign(Object.assign({}, userInformation), { ip, results: relationshipsType.title }));
            const calculatorResults = resultsDoc[relationshipsType.title];
            res.status(200).send({
                message: 'Successful calculate!',
                relationshipsType,
                calculatorResults,
                scoreResult,
            });
        }
        else {
            return res
                .status(400)
                .send({ message: 'Error, scoreResult is not a number!' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400);
    }
});
exports.default = getPersonalitiesCalculatorResults;
