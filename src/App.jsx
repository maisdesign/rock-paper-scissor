import { useState } from "react";
import Matcher from './components/Matcher.jsx'
import Chooser from './components/Chooser.jsx'
import resetCounters from './components/resetCounters.js'


function App() {

  const [picker, setPicker] = useState('start');
  const [chosen, setChosen] = useState('start');
  const [score, setScore] = useState(0);
  const [cpuscore, setCpuScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [result, setResult] = useState('');
  const [version, setVersion] = useState('classic');

  return (
    <div className="game-card">
      <h1 className="game-title">ROCK PAPER SCISSORS (LIZARD SPOCK?)</h1>
      <p className="game-subtitle">First choose your version of the game:</p>
      {/*}
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" value="version" id="checkNativeSwitch" checked={version === 'advanced'}
          onChange={
            e => {
              setVersion(e.target.checked ? 'advanced' : 'classic');
              resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore)
            }
          } switch="true" />
        <label className="form-check-label" htmlFor="checkNativeSwitch">
          Classic game / Lizard Spock variant
        </label>
      </div>
      {*/}
      <div className="version-container">
        <button className={"version-classic" + ((version === 'classic') ? " is-active" : "")} value="classic" onClick={() => {
          setVersion('classic');
          resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore)
        }}>Classic</button>
        <button className={"version-advanced" + ((version === 'advanced') ? " is-active" : "")} value="advanced" onClick={() => {
          setVersion('advanced');
          resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore)
        }}>Advanced <img src="/icons/phaser32.png" alt="phaser" /></button>
      </div>

      <p className="game-subtitle">Then choose your weapon</p>
      <Chooser setChosen={setChosen} setPicker={setPicker} setScore={setScore} matches={matches} setMatches={setMatches} setResult={setResult} setCpuScore={setCpuScore} version={version} />
      <Matcher score={score} setScore={setScore} matches={matches} setMatches={setMatches} result={result} setResult={setResult} picker={picker} chosen={chosen} setPicker={setPicker} setChosen={setChosen} cpuscore={cpuscore} setCpuScore={setCpuScore} version={version} />
    </div >

  )
}

export default App
