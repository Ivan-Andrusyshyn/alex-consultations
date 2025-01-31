"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPersonalityType = (scores) => {
    const firstLetter = scores.E > scores.I ? 'E' : 'I';
    const secondLetter = scores.N > scores.S ? 'N' : 'S';
    const thirdLetter = scores.F > scores.T ? 'F' : 'T';
    const fourthLetter = scores.J > scores.P ? 'J' : 'P';
    const personalityType = `${firstLetter}${secondLetter}${thirdLetter}${fourthLetter}`;
    const personalityMap = {
        ISFJ: 'Захисник',
        ISTJ: 'Адміністратор',
        INFJ: 'Адвокат',
        INTJ: 'Архітектор',
        ISFP: 'Авантюрист',
        ISTP: 'Віртуоз',
        INFP: 'Посередник',
        INTP: 'Вчений',
        ESFJ: 'Консул',
        ESTJ: 'Керівник',
        ENFJ: 'Протагоніст',
        ENTJ: 'Командир',
        ESFP: 'Шоумен',
        ESTP: 'Підприємець',
        ENFP: 'Борець',
        ENTP: 'Полеміст',
    };
    return personalityMap[personalityType] || 'Невідомий тип';
};
exports.default = getPersonalityType;
