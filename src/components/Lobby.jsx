import { useState, useEffect } from 'react';
import { supaClient } from './../lib/supabase.js'
import { nanoid } from 'nanoid'


function Lobby({ setSessionId, setRole, sessionId, setReady, version, setVersion, sessionEnded, setSessionEnded }) {
    const [inputCode, setInputCode] = useState('');
    const [errorState, setErrorState] = useState("");
    const [copied, setCopied] = useState(false);

    async function joinSession(code) {
        const { data, error } = await supaClient.from('sessions').select().eq('id', code).single()
        if (data) { setRole('u2'); setReady(true); setVersion(data.version); setSessionId(code); setSessionEnded(false); await supaClient.from('sessions').update({ status: 'joined.u2' }).eq('id', code) }
        if (error) { setErrorState("We couldn't find a session, please check again") }
    }

    useEffect(() => {
        const joinCode = new URLSearchParams(window.location.search).get('join')
        if (!joinCode) return
        window.history.replaceState({}, '', window.location.pathname)
        ;(async () => { await joinSession(joinCode) })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleCopy() {
        navigator.clipboard.writeText(sessionId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?join=${sessionId}`
    const shareText = `I challenge you to Rock Paper Scissors (Lizard Spock?)! Join my game: ${shareUrl}`
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("I challenge you to Rock Paper Scissors (Lizard Spock?)! Join my game!")}`

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
                <div className="share-buttons-row">
                    <a className="share-btn share-wa" href={waUrl} target="_blank" rel="noreferrer">WhatsApp</a>
                    <a className="share-btn share-tg" href={tgUrl} target="_blank" rel="noreferrer">Telegram</a>
                </div>
            </div>
        ) :
            <div className="lobby-container">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await joinSession(inputCode)
                }}>
                    <label htmlFor="insertSessionId" className="lobby-join-label">Have a code? Enter it here</label>
                    <input type="text" className="lobby-input" id="insertSessionId" placeholder="Paste your friend's code..." value={inputCode} onChange={e => { setInputCode(e.target.value); setErrorState('') }} />
                    <button type="submit" className="lobby-submit-btn">Join session</button>
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
