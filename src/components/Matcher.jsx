import possibilities from '../data/possibilities.js'
function imageShow(array, value) {
    const image = array.find(item => item.label === value);
    return image.src;
}
function Matcher({ score, matches, setScore, setMatches, result, picker, chosen, setPicker, setChosen, setResult, setCpuScore, cpuscore }) {
    function resetCounters() {
        setScore(0);
        setCpuScore(0);
        setMatches(0);
        setPicker('start');
        setChosen('start');
        setResult('');
    }

    const resultClass = result === 'Hai vinto'
        ? 'result-win'
        : result === 'Hai perso'
            ? 'result-lose'
            : 'result-draw';

    return <>
        <div className="vs-section mt-4 pt-4">
            <div className="d-flex align-items-center justify-content-center gap-4">
                <div className="d-flex flex-column align-items-center gap-2">
                    <span className="player-label text-uppercase small">Tu</span>
                    <img className="choice-img" src={`/icons/${imageShow(possibilities, chosen)}`} alt={chosen} />
                </div>
                <span className="vs-badge fw-black">VS</span>
                <div className="d-flex flex-column align-items-center gap-2">
                    <span className="player-label text-uppercase small">CPU</span>
                    <img className="choice-img" src={`/icons/${imageShow(possibilities, picker)}`} alt={picker} />
                </div>
            </div>

            {result && <p className={`result-text fw-bold ${resultClass}`}>{result}</p>}

            <div className="score-section d-flex justify-content-center gap-5 rounded-3 p-3 mt-3">
                <div className="text-center">
                    <div className="score-number fw-bold">{score}</div>
                    <div className="score-label text-uppercase small">Vittorie</div>
                </div>
                <div className="text-center">
                    <div className="score-number fw-bold">{matches}</div>
                    <div className="score-label text-uppercase small">Partite</div>
                </div>
                <div className="text-center">
                    <div className="score-number fw-bold">5</div>
                    <div className="score-label text-uppercase small">Round</div>
                </div>
            </div>

            {matches >= 5 && (
                <div className="mt-3">
                    {score > cpuscore
                        ? <div className="alert alert-success" role="alert">Hai vinto!</div>
                        : score === cpuscore
                            ? <div className="alert alert-warning" role="alert">Hai pareggiato</div>
                            : <div className="alert alert-danger" role="alert">Non hai vinto</div>
                    }
                    <button className="reset-btn btn btn-info w-100" onClick={resetCounters}>
                        Riavvia gioco
                    </button>
                </div>
            )}
        </div>
    </>
}

export default Matcher
