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
Object.defineProperty(exports, "__esModule", { value: true });
const getGoogleDriveFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = '1MXEb0Grxn_KwhxDHhVdV_3OM6A68K2Jq';
        const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const response = yield fetch(fileUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch the file');
        }
        const jsonData = yield response.json();
        return res.status(200).json(jsonData);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = getGoogleDriveFile;
