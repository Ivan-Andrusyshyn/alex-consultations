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
const cache_1 = __importDefault(require("../../../services/cache"));
const getPersonalitiesCalculatorResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { personsTypes, userInformation } = req.body;
        const ip = req.headers['x-forwarded-for']
            ? req.headers['x-forwarded-for'].split(',')[0].trim()
            : req.socket.remoteAddress || 'Unknown';
        const fileResultsId = '1uj1XQecNEmSBI1cJRINcBYJmTtBMj4sK';
        const calculateMatchesId = '1sy5WZO5q4ERIOZMeTLWdprLda9GTI0az';
        const results = yield cache_1.default.getCache(fileResultsId, () => google_sheets_1.default.getDataGoogle(fileResultsId));
        const calculateMatches = yield cache_1.default.getCache(calculateMatchesId, () => google_sheets_1.default.getDataGoogle(calculateMatchesId));
        const typesOfPair = `${personsTypes[0]}-${personsTypes[1]}`;
        const scoreResult = calculateMatches[typesOfPair];
        if (scoreResult) {
            const relationshipsType = _16_personalities_calculator_1.default.getTypeRelationshipByScore(scoreResult);
            yield google_sheets_1.default.postTestResultsOnSheet(Object.assign(Object.assign({}, userInformation), { ip, results: relationshipsType.title }));
            const calculatorResults = results[relationshipsType.title];
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
