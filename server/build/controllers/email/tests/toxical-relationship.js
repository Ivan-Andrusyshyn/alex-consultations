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
const dotenv_1 = require("dotenv");
const nodemailer_1 = __importDefault(require("../../../services/nodemailer"));
const createResultsTemplate_1 = require("./createResultsTemplate");
const toxical_relationship_1 = __importDefault(require("../../../services/toxical-relationship"));
(0, dotenv_1.config)();
const postEmailToxicalRelationship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value } = req.body;
        if (!value.email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        const results = toxical_relationship_1.default.getResults(value.category);
        const mailOptions = {
            from: `"Vidchuttia"<${process.env.EMAIL_USER}>`,
            to: value.email,
            subject: 'Тест на токсичність стосунків',
            html: (0, createResultsTemplate_1.getToxicalRelTemplate)(results),
        };
        const respone = yield nodemailer_1.default.sendMail(mailOptions);
        res
            .status(200)
            .send({ message: `Success send email message to ${value.email}` });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.default = postEmailToxicalRelationship;
