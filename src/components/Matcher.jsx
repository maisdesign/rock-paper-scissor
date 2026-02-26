import possibilities from '../data/possibilities.js'
import possibilitiesAdvanced from '../data/possibilitiesAdvanced.js'
import resetCounters from './resetCounters.js'
function imageShow(array, value) {
    const image = array.find(item => item.label === value);
    return image.src;
}

function Matcher({ score, matches, cpuscore, version, result, picker, chosen, setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, sentence, setSentence }) {

    const imgSet = (version === 'classic') ? possibilities : possibilitiesAdvanced;



    /*function resetCounters() {
        setScore(0);
        setCpuScore(0);
        setMatches(0);
        setPicker('start');
        setChosen('start');
        setResult('');
    }*/

    const resultClass = result === 'You win'
        ? 'result-win'
        : result === 'You lose'
            ? 'result-lose'
            : 'result-draw';

    return <>
        <div className="vs-section mt-4 pt-4">
            <div className="d-flex align-items-center justify-content-center gap-4">
                <div className="d-flex flex-column align-items-center gap-2">
                    <span className="player-label text-uppercase small">You</span>
                    <img className={"choice-img" + ((version === 'classic') ? " choice-classic" : " choice-advanced")} src={`/icons/${imageShow(imgSet, chosen)}`} alt={chosen} />
                </div>
                <span className="vs-badge fw-black">VS</span>
                <div className="d-flex flex-column align-items-center gap-2">
                    <span className="player-label text-uppercase small">CPU</span>
                    <img className="choice-img" src={`/icons/${imageShow(imgSet, picker)}`} alt={picker} />
                </div>
            </div>
            {sentence && <p className="battle-sentence">{sentence}</p>}
            {result && <p className={`result-text fw-bold ${resultClass}`}>{result}</p>}

            <div className="score-section d-flex justify-content-center gap-5 rounded-3 p-3 mt-3">
                <div className="text-center">
                    <div className="score-number fw-bold">{score}</div>
                    <div className="score-label text-uppercase small">Wins</div>
                </div>
                <div className="text-center">
                    <div className="score-number fw-bold">{matches}</div>
                    <div className="score-label text-uppercase small">Matches</div>
                </div>
                <div className="text-center">
                    <div className="score-number fw-bold">5</div>
                    <div className="score-label text-uppercase small">Round</div>
                </div>
            </div>

            {matches >= 5 && (
                <div className="mt-3">
                    {score > cpuscore
                        ? <div className="alert alert-success" role="alert">You win!</div>
                        : score === cpuscore
                            ? <div className="alert alert-warning" role="alert">It's a draw!</div>
                            : <div className="alert alert-danger" role="alert">You lose!</div>
                    }
                    <button className="reset-btn btn btn-info w-100" onClick={() => resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence)}>
                        Play again
                    </button>
                </div>
            )}
        </div>
    </>
}

export default Matcher
