import possibilities from '../data/possibilities.js'
import possibilitiesAdvanced from '../data/possibilitiesAdvanced.js'
import { supaClient } from '../lib/supabase.js'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



function Chooser({ setChosen, setPicker, setScore, matches, setMatches, setResult, setCpuScore, version, setSentence, sessionId, role, mode, calcResult, picked }) {

    const userWeapons = (version === 'classic') ? possibilities.filter(item => item.label !== 'start') : possibilitiesAdvanced.filter(item => item.label !== 'start');

    async function handleSubmit(label) {
        if (mode === 'multi') {
            if (picked) {
                await supaClient
                    .from('sessions')
                    .update({ [role === 'u1' ? 'u1Weapon' : 'u2Weapon']: label, status: 'result' })
                    .eq('id', sessionId)
            } else {
                if (role === 'u1') {
                    await supaClient
                        .from('sessions')
                        .update({ u1Weapon: label, status: 'picking.u1' })
                        .eq('id', sessionId)
                } else if (role === 'u2') {
                    await supaClient
                        .from('sessions')
                        .update({ u2Weapon: label, status: 'picking.u2' })
                        .eq('id', sessionId)
                }
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