"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalitiesPhraseService = void 0;
const phrases_array_1 = require("../content/16-personality/phrases/phrases-array");
const personalityTypes = [
    'ENFJ',
    'ENFP',
    'ENTJ',
    'ENTP',
    'ESFJ',
    'ESFP',
    'ESTJ',
    'ESTP',
    'INFJ',
    'INFP',
    'INTJ',
    'INTP',
    'ISFJ',
    'ISFP',
    'ISTJ',
    'ISTP',
];
class PersonalitiesPhraseService {
    getAllDayPhrases() {
        const today = new Date().getDate() - 1;
        const dayPhrases = [];
        for (let i = 0; i < phrases_array_1.phrasesArray.length; i++) {
            const personalityType = personalityTypes[i];
            const phrase = phrases_array_1.phrasesArray[i][today];
            if (phrase) {
                dayPhrases.push({ personalityType, phrase });
            }
        }
        return { dayPhrases, dayNumber: today + 1 };
    }
}
exports.personalitiesPhraseService = new PersonalitiesPhraseService();
