import possibilities from '../data/possibilities.js'
import possibilitiesAdvanced from '../data/possibilitiesAdvanced.js'
import { supaClient } from '../lib/supabase.js'
import calcResult from './calcResult.js'
import { GAME_MATCHES_COUNTER } from '../data/configGame.js'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



function Chooser({ setChosen, setPicker, setScore, matches, setMatches, setResult, setCpuScore, version, setSentence, sessionId, role, mode, setChosenWeapon, chosenWeapon }) {

    const userWeapons = (version === 'classic') ? possibilities.filter(item => item.label !== 'start') : possibilitiesAdvanced.filter(item => item.label !== 'start');

    async function handleSubmit(label) {
        if (mode === 'multi') {
            const myField = role === 'u1' ? 'u1Weapon' : 'u2Weapon';
            const opponentField = role === 'u1' ? 'u2Weapon' : 'u1Weapon';
            console.log('[C] picking', label, 'as', role);
            const { error: wErr } = await supaClient.from('sessions').update({ [myField]: label, status: `picking.${role}` }).eq('id', sessionId);
            console.log('[C] weapon+status updated, err:', wErr);
            setChosenWeapon(label);
            const { data, error: sErr } = await supaClient.from('sessions').select(opponentField).eq('id', sessionId).single();
            console.log('[C] opponent weapon:', data?.[opponentField], 'err:', sErr);
            if (data?.[opponentField]) {
                console.log('[C] triggering result from Chooser');
                supaClient.from('sessions').update({ status: 'result' }).eq('id', sessionId).neq('status', 'result');
            }
        } else {
            const vestratto = userWeapons[getRandomInt(userWeapons.length)].label;
            setChosen(label);
            setPicker(vestratto);
            const outcome = calcResult(label, vestratto, version);
            setMatches(prev => prev + 1);
            setResult(outcome.result);
            setSentence(outcome.sentence);
            setScore(prev => prev + outcome.playerPoint);
            setCpuScore(prev => prev + outcome.cpuPoint);
        }
    }

    return <>
        <span className="chooser-label text-uppercase small fw-semibold">Choose your weapon!</span>
        {mode === 'multi' && matches < GAME_MATCHES_COUNTER && (
            <div className={`status-indicator ${chosenWeapon ? 'status-yellow' : 'status-green'}`}>
                {chosenWeapon ? 'Waiting for opponent...' : 'Your turn! Pick your weapon'}
            </div>
        )}
        <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap flex-md-nowrap">
            {userWeapons.map(({ id, label, src }) =>
                <button key={id} className={"weapon-btn" + (version === 'classic' ? " weapon-classic" : " weapon-advanced") + (label === chosenWeapon ? " weapon-selected" : "")} onClick={() => handleSubmit(label)} disabled={matches >= GAME_MATCHES_COUNTER || (mode === 'multi' && !!chosenWeapon)}>
                    <img src={`/icons/${src}`} alt={label} />
                </button>)
            }
        </div>
    </>
}

export default Chooser