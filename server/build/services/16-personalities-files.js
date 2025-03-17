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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getTypeByResults_1 = require("../controllers/personalities/getTypeByResults");
const filePath = path_1.default.join(process.cwd(), 'src', 'content', '16-personality', 'results.json');
class PersonalitiesFileService {
    fileEditor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stats = yield fs_1.default.promises.stat(filePath);
                const lastModifiedTime = stats.mtime;
                const currentTime = new Date();
                const timeDifference = currentTime.getTime() - lastModifiedTime.getTime();
                if (timeDifference >= 86400000) {
                    const googelFile = yield (0, getTypeByResults_1.getDataGoogle)();
                    console.log('24 hours have passed, rewriting the file...');
                    yield this.writeFile(googelFile);
                    return googelFile;
                }
                else {
                    console.log('File was modified within the last 24 hours, reading it...');
                    return yield this.readFile();
                }
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    const googelFile = yield (0, getTypeByResults_1.getDataGoogle)();
                    yield this.writeFile(googelFile);
                    return googelFile;
                }
                else {
                    console.error('Error checking file stats:', err);
                    throw new Error('Error with file operations');
                }
            }
        });
    }
    writeFile(personInformation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.default.promises.writeFile(filePath, JSON.stringify(personInformation));
                console.log('Done writing');
            }
            catch (err) {
                console.error('Error writing file:', err);
                throw err;
            }
        });
    }
    readFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(filePath, 'utf8');
                return JSON.parse(data);
            }
            catch (err) {
                console.error('Error reading file:', err);
                throw err;
            }
        });
    }
}
const personalitiesFileService = new PersonalitiesFileService();
exports.default = personalitiesFileService;
