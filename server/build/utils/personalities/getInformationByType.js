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
const getInformationByType = (type) => {
    switch (type) {
        case 'Захисник':
            return zahisnyk_1.default;
        case 'Адміністратор':
            return administrator_1.default;
        case 'Адвокат':
            return advokat_1.default;
        case 'Архітектор':
            return architektor_1.default;
        case 'Авантюрист':
            return avanturist_1.default;
        case 'Віртуоз':
            return virtuos_1.default;
        case 'Посередник':
            return poserednyk_1.default;
        case 'Вчений':
            return vcheny_1.default;
        case 'Консул':
            return konsul_1.default;
        case 'Протагоніст':
            return protogonist_1.default;
        case 'Командир':
            return komandir_1.default;
        case 'Шоумен':
            return shoumen_1.default;
        case 'Підприємець':
            return pidpriemec_1.default;
        case 'Борець':
            return poserednik_1.default;
        case 'Полеміст':
            return polemist_1.default;
        default:
            return null;
    }
};
exports.default = getInformationByType;
