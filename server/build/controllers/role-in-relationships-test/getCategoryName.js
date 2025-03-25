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
const roleInRelationshipService_1 = __importDefault(require("../../services/roleInRelationshipService"));
const getCategoryName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answers, userInformation } = req.body;
        const ip = req.headers['x-forwarded-for']
            ? req.headers['x-forwarded-for'].split(',')[0].trim()
            : req.socket.remoteAddress || 'Unknown';
        const categoryName = roleInRelationshipService_1.default.getNameCategoryByScore(answers);
        yield google_sheets_1.default.postTestResultsOnSheet(Object.assign(Object.assign({}, userInformation), { ip,
            categoryName }));
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
exports.default = getCategoryName;
