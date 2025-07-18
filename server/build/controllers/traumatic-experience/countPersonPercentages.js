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
const traumatic_experience_1 = __importDefault(require("../../services/traumatic-experience"));
const google_sheets_1 = __importDefault(require("../../services/google-sheets"));
const countPersonPercentages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = req.body.answers;
        const userInformation = req.body.userInformation;
        const { percentages, scores, matchResults, sensitivityType, originMatchResults, minScoreNumber, maxScoreNumber, } = traumatic_experience_1.default.countPersonPercentages(answers);
        const ip = req.headers['x-forwarded-for']
            ? req.headers['x-forwarded-for'].split(',')[0].trim()
            : req.socket.remoteAddress || 'Unknown';
        yield google_sheets_1.default.postTestResultsOnSheet(Object.assign(Object.assign({}, userInformation), { ip, results: sensitivityType }));
        res.status(200).send({
            results: matchResults,
            message: 'Success post scores operation.',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send('Internal server error');
    }
});
exports.default = countPersonPercentages;
