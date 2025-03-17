"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perfectMatches = [
    ['ISFJ', 'ESFP'],
    ['ISTJ', 'ESTP'],
    ['INFJ', 'ENFP'],
    ['INTJ', 'ENTP'],
    ['ISFP', 'ESFJ'],
    ['ISTP', 'ESTJ'],
    ['INFP', 'ENFJ'],
    ['INTP', 'ENTJ'],
];
const highMatches = [
    ['ISFJ', 'ESTP'],
    ['ISTJ', 'ESFP'],
    ['INFJ', 'ENTP'],
    ['INTJ', 'ENFP'],
    ['ISFP', 'ENFJ'],
    ['ISTP', 'ENTJ'],
    ['INFP', 'INFJ'],
    ['INTP', 'ESTJ'],
];
const worstMatches = [
    ['ISFJ', 'ENTP'],
    ['ESFP', 'INTJ'],
    ['ISTJ', 'ENFP'],
    ['ESTP', 'INFJ'],
    ['ISFP', 'ENTJ'],
    ['ESFJ', 'INTP'],
    ['ESTJ', 'INFP'],
];
const traitCompatibility = {
    'E+I': 10,
    'N+N': 40,
    'F+F': 30,
    'T+T': 30,
    'J+P': 20,
    'I+I': 5,
    'E+E': 5,
    'N+S': 20,
    'F+T': 15,
    'J+J': 10,
    'P+P': 10,
    'T+F': 15,
};
class PersonalitiesCalculatorService {
    constructor() {
        this.groupMultipliers = {
            'ST+NF': 0.8,
            'SF+NF': 0.8,
            'NT+NF': 0.95,
            'EJ+EP': 0.8,
            'EJ+IP': 0.8,
            'EP+IP': 0.9,
            'IJ+EJ': 0.9,
        };
    }
    getTypeRelationshipByScore(percantages) {
        if (percantages > 30 && percantages <= 53)
            return 'Паралельні світи';
        if (percantages > 53 && percantages <= 70)
            return 'Хиткий міст';
        if (percantages > 71 && percantages <= 82)
            return 'Глибоке взаєморозуміння';
        if (percantages > 83 && percantages <= 90)
            return 'Справжня гармонія';
        if (percantages > 91 && percantages <= 100)
            return 'Одна душа на двох';
        else
            return '';
    }
    calculateMatches(pair) {
        const normalizedPair = pair.sort();
        if (this.comparePair(perfectMatches, normalizedPair)) {
            return 100;
        }
        else if (this.comparePair(highMatches, normalizedPair)) {
            return 90;
        }
        else if (this.comparePair(worstMatches, normalizedPair)) {
            return 15;
        }
        else {
            let score = this.calculateTraitCompatibility(pair[0], pair[1]);
            score *= this.getGroupMultiplier(pair[0], pair[1]);
            return Math.round(score);
        }
    }
    calculateTraitCompatibility(person1, person2) {
        var _a;
        let score = 0;
        for (let i = 0; i < 4; i++) {
            const traitPair = [person1[i], person2[i]].sort().join('+');
            score += (_a = traitCompatibility[traitPair]) !== null && _a !== void 0 ? _a : 0;
        }
        return score;
    }
    comparePair(matches, normalizedPair) {
        return matches.some((p) => p.sort().toString() === normalizedPair.toString());
    }
    getGroupMultiplier(person1, person2) {
        var _a;
        const group1 = this.getGroup(person1);
        const group2 = this.getGroup(person2);
        const key = [group1, group2].sort().join('+');
        return (_a = this.groupMultipliers[key]) !== null && _a !== void 0 ? _a : 1;
    }
    getGroup(personality) {
        const [first, second, third, fourth] = personality;
        let group = '';
        if (first === 'E' && fourth === 'J')
            group = 'EJ';
        else if (first === 'E' && fourth === 'P')
            group = 'EP';
        else if (first === 'I' && fourth === 'J')
            group = 'IJ';
        else if (first === 'I' && fourth === 'P')
            group = 'IP';
        if (second === 'N' && third === 'T')
            return 'NT';
        if (second === 'N' && third === 'F')
            return 'NF';
        if (second === 'S' && third === 'T')
            return 'ST';
        if (second === 'S' && third === 'F')
            return 'SF';
        return group;
    }
}
const personalitiesCalculatorService = new PersonalitiesCalculatorService();
exports.default = personalitiesCalculatorService;
