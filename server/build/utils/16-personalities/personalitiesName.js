"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ISTJ_1 = require("../../content/16-personality/ISTJ");
const INFJ_1 = require("../../content/16-personality/INFJ");
const INTJ_1 = require("../../content/16-personality/INTJ");
const ISFP_1 = require("../../content/16-personality/ISFP");
const ENTJ_1 = require("../../content/16-personality/ENTJ");
const ESFJ_1 = require("../../content/16-personality/ESFJ");
const ESTP_1 = require("../../content/16-personality/ESTP");
const ENTP_1 = require("../../content/16-personality/ENTP");
const ENFP_1 = require("../../content/16-personality/ENFP");
const INFP_1 = require("../../content/16-personality/INFP");
const ENFJ_1 = require("../../content/16-personality/ENFJ");
const ESFP_1 = require("../../content/16-personality/ESFP");
const INTP_1 = require("../../content/16-personality/INTP");
const ISTP_1 = require("../../content/16-personality/ISTP");
const ISFJ_1 = require("../../content/16-personality/ISFJ");
const personalityTypes = new Map([
    ['Захисник', ISFJ_1.ISFJ],
    ['Адміністратор', ISTJ_1.ISTJ],
    ['Адвокат', INFJ_1.INFJ],
    ['Архітектор', INTJ_1.INTJ],
    ['Авантюрист', ISFP_1.ISFP],
    ['Віртуоз', ISTP_1.ISTP],
    ['Посередник', INFP_1.INFP],
    ['Вчений', INTP_1.INTP],
    ['Консул', ESFJ_1.ESFJ],
    ['Протагоніст', ENFJ_1.ENFJ],
    ['Командир', ENTJ_1.ENTJ],
    ['Шоумен', ESFP_1.ESFP],
    ['Підприємець', ESTP_1.ESTP],
    ['Борець', ENFP_1.ENFP],
    ['Полеміст', ENTP_1.ENTP],
]);
exports.default = personalityTypes;
