import { useState } from 'react';
import { supaClient } from './../lib/supabase.js'
import { nanoid } from 'nanoid'


function Lobby({ setSessionId, setRole, sessionId, setReady, version, setVersion, sessionEnded, setSessionEnded }) {
    const [inputCode, setInputCode] = useState('');
    const [errorState, setErrorState] = useState("");
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(sessionId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return <>
        {sessionId ? (
            <div className="session-share">
                <p className="session-share-label">Share this code with your friend:</p>
                <div className="session-code-row">
                    <span className="session-code">{sessionId}</span>
                    <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
        ) :
            <div className="lobby-container">
                <form onSubmit={e => e.preventDefault()}>
                    <label htmlFor="insertSessionId" className="lobby-join-label">Have a code? Enter it here</label>
                    <input type="text" className="lobby-input" id="insertSessionId" placeholder="Paste your friend's code..." value={inputCode} onChange={e => setInputCode(e.target.value)} />
                    <button type="submit" className="lobby-submit-btn" onClick={async () => {
                        const { data, error } = await supaClient.from('sessions').select().eq('id', inputCode).single()
                        if (data) { setRole('u2'); setReady(true); setVersion(data.version); setSessionId(inputCode); setSessionEnded(false); await supaClient.from('sessions').update({ status: 'joined.u2' }).eq('id', inputCode) }
                        if (error) { setErrorState("We couldn't find a session, please check again") }
                    }}>Join session</button>
                </form>
                {errorState && <p className="lobby-error">{errorState}</p>}
                {sessionEnded && <p className="session-ended-msg">Session ended.</p>}
                <p className="lobby-divider">— or —</p>
                <button type="button" className="session-generator" onClick={async () => {
                    const session = nanoid();
                    const { error } = await supaClient.from('sessions').insert({ id: session, version: version })
                    if (!error) { setRole('u1'); setSessionId(session); setSessionEnded(false) }
                    if (error) { setErrorState(error.message) }
                }}>Generate your session ID</button>
            </div>
        }
    </>
}

export default Lobby