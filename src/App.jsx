import { useState, useEffect } from "react";
import Matcher from './components/Matcher.jsx'
import Chooser from './components/Chooser.jsx'
import resetCounters from './components/resetCounters.js'
import Lobby from './components/Lobby.jsx'
import { supaClient } from './lib/supabase.js'
import calcResult from './components/calcResult.js'

function App() {

  const [picker, setPicker] = useState('start');
  const [chosen, setChosen] = useState('start');
  const [score, setScore] = useState(0);
  const [cpuscore, setCpuScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [result, setResult] = useState('');
  const [version, setVersion] = useState('classic');
  const [sentence, setSentence] = useState('');
  const [mode, setMode] = useState('single')
  const [sessionId, setSessionId] = useState('');
  const [role, setRole] = useState('');
  const [picked, setPicked] = useState('');
  const [ready, setReady] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  async function handleLeave() {
    await supaClient.from('sessions').delete().eq('id', sessionId)
    setSessionId('');
    setRole('');
    setReady(false);
    setPicked('');
    resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence);
  }

  async function handleReset() {

    resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence);
    setPicked('');
    if (mode === 'multi') {

      await supaClient
        .from('sessions')
        .update({ u1Weapon: null, u2Weapon: null, status: 'picking' })
        .eq('id', sessionId)
    }

  }

  useEffect(() => {
    if (!sessionId) return

    const channel = supaClient
      .channel(sessionId)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'sessions',
        filter: `id=eq.${sessionId}`
      }, (payload) => {
        if (payload.eventType === 'DELETE') {
          setSessionId(''); setRole(''); setReady(false); setPicked('');
          setSessionEnded(true);
          resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence);
          return;
        }
        const { u1Weapon, u2Weapon, status } = payload.new
        if (status === 'picking.u1' && role === 'u2') { setPicked(u1Weapon) }
        if (status === 'picking.u2' && role === 'u1') { setPicked(u2Weapon) }
        if (status === 'joined.u2' && role === 'u1') { setReady(true) }
        if (status === 'picking') { resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence); setPicked('') }
        if (status === 'endRound') { setPicker('start'); setPicked(''); setChosen('start'); setSentence(''); setResult('') }

        if (status === 'result') {
          let myWeapon, opponentWeapon
          if (role === 'u1') {
            myWeapon = u1Weapon; opponentWeapon = u2Weapon
          } else {
            myWeapon = u2Weapon; opponentWeapon = u1Weapon
          }
          setChosen(myWeapon)
          setPicker(opponentWeapon)
          const outcome = calcResult(myWeapon, opponentWeapon, version)
          setPicked('');
          setTimeout(() => {

            supaClient
              .from('sessions')
              .update({ u1Weapon: null, u2Weapon: null, status: 'endRound' })
              .eq('id', sessionId).eq('status', 'result')

          }, 1000)
          setMatches(prev => prev + 1)
          setResult(outcome.result)
          setSentence(outcome.sentence)
          setScore(prev => prev + outcome.playerPoint)
          setCpuScore(prev => prev + outcome.cpuPoint)
        }

      })
      .subscribe()

    return () => supaClient.removeChannel(channel)
  }, [sessionId, role, version])

  return (
    <div className="game-card p-md-4 p-1">
      <h1 className="game-title">ROCK PAPER SCISSORS (LIZARD SPOCK?)</h1>
      <p className="game-subtitle">First choose your version of the game:</p>
      <div className="mode-row">
        <div className="version-container modality">
          <button className={"mode-single" + ((mode === 'single') ? " is-active" : "")} value="single" onClick={() => {
            setMode('single');
            resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence)
          }} disabled={mode === 'multi' && !!sessionId}>Single</button>
          <button className={"mode-multi" + ((mode === 'multi') ? " is-active" : "")} value="multi" onClick={() => {
            setMode('multi');
            resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence)
          }} disabled={mode === 'multi' && !!sessionId}>Multi</button>
        </div>
        {mode === 'multi' && sessionId && (
          <button className="leave-btn" onClick={handleLeave} title="Leave session">✕</button>
        )}
      </div>
      {mode === 'multi' && !ready ? <Lobby sessionId={sessionId} setSessionId={setSessionId} setRole={setRole} setReady={setReady} version={version} setVersion={setVersion} sessionEnded={sessionEnded} setSessionEnded={setSessionEnded} /> :
        <div>
          <div className="version-container versioning">
            <button className={"version-classic" + ((version === 'classic') ? " is-active" : "")} value="classic" onClick={() => {
              setVersion('classic');
              resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence)
            }} disabled={mode === 'multi'}>Classic</button>
            <button className={"version-advanced" + ((version === 'advanced') ? " is-active" : "")} value="advanced" onClick={() => {
              setVersion('advanced');
              resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence)
            }} disabled={mode === 'multi'}>Advanced <img src="/icons/phaser32.png" alt="phaser" /></button>
          </div>
          {version === 'advanced' && <details><summary>How to play</summary><img className="schema-img my-1" src="/icons/schema.png" alt="How to play" /></details>}

          <p className="game-subtitle">Then choose your weapon</p>
          <Chooser setChosen={setChosen} setPicker={setPicker} setScore={setScore} matches={matches} setMatches={setMatches} setResult={setResult} setCpuScore={setCpuScore} version={version} setSentence={setSentence} sessionId={sessionId} role={role} mode={mode} picked={picked} />
          <Matcher score={score} matches={matches} result={result} picker={picker} chosen={chosen} cpuscore={cpuscore} version={version} sentence={sentence} handleReset={handleReset} mode={mode} />
        </div>
      }
    </div >

  )
}

export default App
