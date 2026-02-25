import possibilities from '../data/possibilities.js'
import rules from '../data/rules.js'
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const userWeapons = possibilities.filter(item => item.label !== 'start');


function Chooser({ setChosen, setPicker, setScore, matches, setMatches, setResult, setCpuScore }) {

    function calcResult(chosen, picker) {
        if (chosen === picker) { return { result: 'Parità', playerPoint: 0, cpuPoint: 0 } };
        if (rules[chosen] === picker) { return { result: 'Hai vinto', playerPoint: 1, cpuPoint: 0 } }
        else { return { result: 'Hai perso', playerPoint: 0, cpuPoint: 1 } };
    }

    function handleSubmit(label) {
        const vestratto = userWeapons[getRandomInt(userWeapons.length)].label;
        setChosen(label);
        setPicker(vestratto);
        setMatches(prev => prev + 1);
        const outcome = calcResult(label, vestratto);
        setResult(outcome.result);
        setScore(prev => prev + outcome.playerPoint);
        setCpuScore(prev => prev + outcome.cpuPoint);
    }
    return <>
        <span className="chooser-label text-uppercase small fw-semibold">Scegli la tua arma</span>
        <div className="d-flex justify-content-center gap-4 mt-3">
            {userWeapons.map(({ id, label, src }) =>
                <button key={id} className="weapon-btn" onClick={() => handleSubmit(label)} disabled={matches >= 5}>
                    <img src={`/icons/${src}`} alt={label} />
                </button>)
            }
        </div>
    </>
}

export default Chooser