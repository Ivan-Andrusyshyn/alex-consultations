"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const administrator_1 = require("../../content/16-personality/administrator");
const advokat_1 = require("../../content/16-personality/advokat");
const architektor_1 = require("../../content/16-personality/architektor");
const avanturist_1 = require("../../content/16-personality/avanturist");
const komandir_1 = require("../../content/16-personality/komandir");
const konsul_1 = require("../../content/16-personality/konsul");
const pidpriemec_1 = require("../../content/16-personality/pidpriemec");
const polemist_1 = require("../../content/16-personality/polemist");
const poserednik_1 = require("../../content/16-personality/poserednik");
const poserednyk_1 = require("../../content/16-personality/poserednyk");
const protogonist_1 = require("../../content/16-personality/protogonist");
const shoumen_1 = require("../../content/16-personality/shoumen");
const vcheny_1 = require("../../content/16-personality/vcheny");
const virtuos_1 = require("../../content/16-personality/virtuos");
const zahisnyk_1 = require("../../content/16-personality/zahisnyk");
const personalityTypes = new Map([
    ['Захисник', zahisnyk_1.ISFJ],
    ['Адміністратор', administrator_1.ISTJ],
    ['Адвокат', advokat_1.INFJ],
    ['Архітектор', architektor_1.INTJ],
    ['Авантюрист', avanturist_1.ISFP],
    ['Віртуоз', virtuos_1.ISTP],
    ['Посередник', poserednyk_1.INFP],
    ['Вчений', vcheny_1.INTP],
    ['Консул', konsul_1.ESFJ],
    ['Протагоніст', protogonist_1.ENFJ],
    ['Командир', komandir_1.ENTJ],
    ['Шоумен', shoumen_1.ESFP],
    ['Підприємець', pidpriemec_1.ESTP],
    ['Борець', poserednik_1.ENFP],
    ['Полеміст', polemist_1.ENTP],
]);
exports.default = personalityTypes;
