"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const administrator_1 = __importDefault(require("../../content/16-personality/administrator"));
const advokat_1 = __importDefault(require("../../content/16-personality/advokat"));
const architektor_1 = __importDefault(require("../../content/16-personality/architektor"));
const avanturist_1 = __importDefault(require("../../content/16-personality/avanturist"));
const komandir_1 = __importDefault(require("../../content/16-personality/komandir"));
const konsul_1 = __importDefault(require("../../content/16-personality/konsul"));
const pidpriemec_1 = __importDefault(require("../../content/16-personality/pidpriemec"));
const polemist_1 = __importDefault(require("../../content/16-personality/polemist"));
const poserednik_1 = __importDefault(require("../../content/16-personality/poserednik"));
const poserednyk_1 = __importDefault(require("../../content/16-personality/poserednyk"));
const protogonist_1 = __importDefault(require("../../content/16-personality/protogonist"));
const shoumen_1 = __importDefault(require("../../content/16-personality/shoumen"));
const vcheny_1 = __importDefault(require("../../content/16-personality/vcheny"));
const virtuos_1 = __importDefault(require("../../content/16-personality/virtuos"));
const zahisnyk_1 = __importDefault(require("../../content/16-personality/zahisnyk"));
const personalityTypes = new Map([
    ['Захисник', zahisnyk_1.default],
    ['Адміністратор', administrator_1.default],
    ['Адвокат', advokat_1.default],
    ['Архітектор', architektor_1.default],
    ['Авантюрист', avanturist_1.default],
    ['Віртуоз', virtuos_1.default],
    ['Посередник', poserednyk_1.default],
    ['Вчений', vcheny_1.default],
    ['Консул', konsul_1.default],
    ['Протагоніст', protogonist_1.default],
    ['Командир', komandir_1.default],
    ['Шоумен', shoumen_1.default],
    ['Підприємець', pidpriemec_1.default],
    ['Борець', poserednik_1.default],
    ['Полеміст', polemist_1.default],
]);
exports.default = personalityTypes;
