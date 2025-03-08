"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTypeByAllScoresNumber = (allNumber) => {
    if (allNumber <= 17) {
        return 'Незламна рівновага';
    }
    else if (allNumber >= 18 && allNumber <= 35) {
        return 'Спокійна адаптивність';
    }
    else if (allNumber >= 36 && allNumber <= 53) {
        return 'Чутлива гармонія';
    }
    else if (allNumber >= 54 && allNumber <= 71) {
        return 'Емоційний барометр';
    }
    else if (allNumber >= 72 && allNumber <= 89) {
        return 'Вразливе серце';
    }
    else if (allNumber >= 90 && allNumber <= 108) {
        return 'Скляна душа';
    }
    else {
        return 'Невідомий рівень';
    }
};
exports.default = getTypeByAllScoresNumber;
