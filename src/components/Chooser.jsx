import possibilities from '../data/possibilities.js'
import possibilitiesAdvanced from '../data/possibilitiesAdvanced.js'
import rules from '../data/rules.js'
import rulesAdvanced from '../data/rulesAdvanced.js'
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



function Chooser({ setChosen, setPicker, setScore, matches, setMatches, setResult, setCpuScore, version, setSentence }) {

    const userWeapons = (version === 'classic') ? possibilities.filter(item => item.label !== 'start') : possibilitiesAdvanced.filter(item => item.label !== 'start');

    function calcResult(chosen, picker, version) {
        if (version === 'classic') {
            if (chosen === picker) { return { result: 'Draw', playerPoint: 0, cpuPoint: 0 } };
            if (rules[chosen] === picker) { return { result: 'You win', playerPoint: 1, cpuPoint: 0 } }
            else { return { result: 'You lose', playerPoint: 0, cpuPoint: 1 } };
        } else {
            if (chosen === picker) { return { result: 'Draw', playerPoint: 0, cpuPoint: 0, sentence: "It's a draw!" } };
            if (picker in rulesAdvanced[chosen].wins) { return { result: 'You win', playerPoint: 1, cpuPoint: 0, sentence: rulesAdvanced[chosen].wins[picker] } }
            else { return { result: 'You lose', playerPoint: 0, cpuPoint: 1, sentence: rulesAdvanced[picker].wins[chosen] } };
        };
    }

    function handleSubmit(label) {
        const vestratto = userWeapons[getRandomInt(userWeapons.length)].label;
        setChosen(label);
        setPicker(vestratto);
        setMatches(prev => prev + 1);
        const outcome = calcResult(label, vestratto, version);
        setResult(outcome.result);
        setSentence(outcome.sentence);
        setScore(prev => prev + outcome.playerPoint);
        setCpuScore(prev => prev + outcome.cpuPoint);
    }
    return <>
        <span className="chooser-label text-uppercase small fw-semibold">Choose your weapon!</span>
        <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap flex-md-nowrap">
            {userWeapons.map(({ id, label, src }) =>
                <button key={id} className={"weapon-btn" + (version === 'classic' ? " weapon-classic" : " weapon-advanced")} onClick={() => handleSubmit(label, version)} disabled={matches >= 5}>
                    <img src={`/icons/${src}`} alt={label} />
                </button>)
            }
        </div>
    </>
}

export default Chooser