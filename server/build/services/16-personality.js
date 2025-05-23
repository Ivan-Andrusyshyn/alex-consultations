"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PersonalitiesService {
    constructor() {
        this.amountQuestionsInType = (qlist) => {
            const letterCount = {
                EI: 0,
                SN: 0,
                TF: 0,
                JP: 0,
            };
            qlist.forEach((q) => {
                const types = new Set();
                q.answers.forEach((answer) => {
                    if (['E', 'I'].includes(answer.type))
                        types.add('EI');
                    else if (['S', 'N'].includes(answer.type))
                        types.add('SN');
                    else if (['T', 'F'].includes(answer.type))
                        types.add('TF');
                    else if (['J', 'P'].includes(answer.type))
                        types.add('JP');
                });
                types.forEach((type) => {
                    letterCount[type] += 1;
                });
            });
            return letterCount;
        };
        this.countPersonPercentages = (answers, amountQuestions) => {
            const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
            for (const [questionId, answer] of Object.entries(answers)) {
                const [points, letter] = answer.split('-');
                if (scores.hasOwnProperty(letter)) {
                    scores[letter] += Number(points);
                }
            }
            const typePairs = [
                ['E', 'I'],
                ['S', 'N'],
                ['T', 'F'],
                ['J', 'P'],
            ];
            const maxScoreOnOneAnswer = 3;
            const percentages = {};
            for (const [type1, type2] of typePairs) {
                const totalQuestions = amountQuestions[`${type1}${type2}`] || 0;
                if (totalQuestions > 0) {
                    const maxScore = totalQuestions * maxScoreOnOneAnswer;
                    const totalScore = scores[type1] + scores[type2];
                    percentages[type1] =
                        totalScore > 0 ? Math.round((scores[type1] / totalScore) * 100) : 50;
                    percentages[type2] = 100 - percentages[type1];
                }
            }
            return { percentages, scores };
        };
        this.getPersonalityType = (scores) => {
            const typeName = this.getCodedTypeName(scores);
            return this.getPersonNameByType(typeName);
        };
    }
    getCodedTypeName(scores) {
        const firstLetter = scores.E > scores.I ? 'E' : 'I';
        const secondLetter = scores.N > scores.S ? 'N' : 'S';
        const thirdLetter = scores.F > scores.T ? 'F' : 'T';
        const fourthLetter = scores.J > scores.P ? 'J' : 'P';
        return `${firstLetter}${secondLetter}${thirdLetter}${fourthLetter}`;
    }
    getPersonNameByType(personalityType) {
        const personalities = {
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
        return personalities[personalityType] || 'Невідомий тип';
    }
}
const personalitiesService = new PersonalitiesService();
exports.default = personalitiesService;
