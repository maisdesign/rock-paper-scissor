import rules from '../data/rules.js'
import rulesAdvanced from '../data/rulesAdvanced.js'

function calcResult(chosen, picker, version) {

    if (version === 'classic') {
        if (chosen === picker) { return { result: 'Draw', playerPoint: 0, cpuPoint: 0, sentence: '' } };
        if (rules[chosen] === picker) { return { result: 'You win', playerPoint: 1, cpuPoint: 0, sentence: '' } }
        else { return { result: 'You lose', playerPoint: 0, cpuPoint: 1, sentence: '' } };
    } else {
        if (chosen === picker) { return { result: 'Draw', playerPoint: 0, cpuPoint: 0, sentence: "It's a draw!" } };
        if (picker in rulesAdvanced[chosen].wins) { return { result: 'You win', playerPoint: 1, cpuPoint: 0, sentence: rulesAdvanced[chosen].wins[picker] } }
        else { return { result: 'You lose', playerPoint: 0, cpuPoint: 1, sentence: rulesAdvanced[picker].wins[chosen] } };
    };

};

export default calcResult