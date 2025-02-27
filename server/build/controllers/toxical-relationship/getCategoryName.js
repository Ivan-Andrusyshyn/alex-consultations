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
const toxical_relationship_1 = __importDefault(require("../../services/toxical-relationship"));
const google_sheets_1 = __importDefault(require("../../services/google-sheets"));
const getCategoryName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answers, userInformation } = req.body;
        google_sheets_1.default.postTestResultsOnSheet(userInformation);
        const categoryName = toxical_relationship_1.default.getNameCategoryByScore(answers);
        console.log(categoryName);
        res.status(200).send({
            message: 'Success get relationship-sensitivity category!',
            categoryName,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
function addHyphens(str) {
    return str.trim().replace(/\s+/g, '-');
}
exports.default = getCategoryName;
