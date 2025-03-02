"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const answersTypes = (id) => {
    if ([37, 45, 29, 14, 23, 1, 48, 51, 54, 64, 67, 72, 73, 87, 90].includes(id)) {
        return [
            { point: 3, text: 'Зовсім не погоджуюсь', type: 'P' },
            { point: 2, text: 'Скоріше не погоджуюсь', type: 'P' },
            { point: 0, text: 'Нейтрально (не можу вирішити)', type: 'P, J' },
            { point: 2, text: 'Скоріше погоджуюсь', type: 'J' },
            { point: 3, text: 'Повністю погоджуюсь', type: 'J' },
        ];
    }
    if ([41, 44, 30, 32, 22, 17, 20, 5, 11, 55, 65, 74].includes(id)) {
        return [
            { point: 3, text: 'Зовсім не погоджуюсь', type: 'J' },
            { point: 2, text: 'Скоріше не погоджуюсь', type: 'J' },
            { point: 0, text: 'Нейтрально (не можу вирішити)', type: 'P, J' },
            { point: 2, text: 'Скоріше погоджуюсь', type: 'P' },
            { point: 3, text: 'Повністю погоджуюсь', type: 'P' },
        ];
    }
    if ([50, 59, 39, 13, 19, 2, 68, 62, 81, 79, 86].includes(id)) {
        return [
            { point: 3, text: 'Зовсім не погоджуюсь', type: 'I' },
            { point: 2, text: 'Скоріше не погоджуюсь', type: 'I' },
            { point: 0, text: 'Нейтрально (не можу вирішити)', type: 'E, I' },
            { point: 2, text: 'Скоріше погоджуюсь', type: 'E' },
            { point: 3, text: 'Повністю погоджуюсь', type: 'E' },
        ];
    }
    if ([
        53, 56, 38, 43, 46, 27, 35, 24, 18, 7, 71, 70, 75, 61, 82, 78, 80, 85, 89,
    ].includes(id)) {
        return [
            { point: 3, text: 'Зовсім не погоджуюсь', type: 'S' },
            { point: 2, text: 'Скоріше не погоджуюсь', type: 'S' },
            { point: 0, text: 'Нейтрально (не можу вирішити)', type: 'S, N' },
            { point: 2, text: 'Скоріше погоджуюсь', type: 'N' },
            { point: 3, text: 'Повністю погоджуюсь', type: 'N' },
        ];
    }
    if ([60, 3, 26, 34, 15, 9, 12, 57, 66, 77, 84].includes(id)) {
        return [
            { point: 3, text: 'Зовсім не погоджуюсь', type: 'N' },
            { point: 2, text: 'Скоріше не погоджуюсь', type: 'N' },
            { point: 0, text: 'Нейтрально (не можу вирішити)', type: 'S, N' },
            { point: 2, text: 'Скоріше погоджуюсь', type: 'S' },
            { point: 3, text: 'Повністю погоджуюсь', type: 'S' },
        ];
    }
    if ([52, 58, 16, 33, 40, 6, 10, 76].includes(id)) {
        return [
            { point: 3, text: 'Зовсім не погоджуюсь', type: 'F' },
            { point: 2, text: 'Скоріше не погоджуюсь', type: 'F' },
            { point: 0, text: 'Нейтрально (не можу вирішити)', type: 'F, T' },
            { point: 2, text: 'Скоріше погоджуюсь', type: 'T' },
            { point: 3, text: 'Повністю погоджуюсь', type: 'T' },
        ];
    }
    if ([49, 42, 21, 28, 31, 4, 63, 69, 88].includes(id)) {
        return [
            { point: 3, text: 'Зовсім не погоджуюсь', type: 'T' },
            { point: 2, text: 'Скоріше не погоджуюсь', type: 'T' },
            { point: 0, text: 'Нейтрально (не можу вирішити)', type: 'F, T' },
            { point: 2, text: 'Скоріше погоджуюсь', type: 'F' },
            { point: 3, text: 'Повністю погоджуюсь', type: 'F' },
        ];
    }
    if ([83, 47, 8, 25, 36].includes(id)) {
        return [
            { point: 3, text: 'Зовсім не погоджуюсь', type: 'E' },
            { point: 2, text: 'Скоріше не погоджуюсь', type: 'E' },
            { point: 0, text: 'Нейтрально (не можу вирішити)', type: 'E, I' },
            { point: 2, text: 'Скоріше погоджуюсь', type: 'I' },
            { point: 3, text: 'Повністю погоджуюсь', type: 'I' },
        ];
    }
    else {
        return [
            { point: 3, text: 'Зовсім не погоджуюсь', type: 'E' },
            { point: 2, text: 'Скоріше не погоджуюсь', type: 'E' },
            { point: 0, text: 'Нейтрально (не можу вирішити)', type: 'E, I' },
            { point: 2, text: 'Скоріше погоджуюсь', type: 'I' },
            { point: 3, text: 'Повністю погоджуюсь', type: 'I' },
        ];
    }
};
exports.default = answersTypes;
