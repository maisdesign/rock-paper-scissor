import { useState } from "react";
import Matcher from './components/Matcher.jsx'
import Chooser from './components/Chooser.jsx'


function App() {

  const [picker, setPicker] = useState('start');
  const [chosen, setChosen] = useState('start');
  const [score, setScore] = useState(0);
  const [cpuscore, setCpuScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [result, setResult] = useState('');

  return (
    <div className="game-card">
      <h1 className="game-title">ROCK PAPER SCISSORS</h1>
      <p className="game-subtitle">Scegli la tua arma e sfida il computer</p>
      <Chooser setChosen={setChosen} setPicker={setPicker} setScore={setScore} matches={matches} setMatches={setMatches} setResult={setResult} setCpuScore={setCpuScore} />
      <Matcher score={score} setScore={setScore} matches={matches} setMatches={setMatches} result={result} setResult={setResult} picker={picker} chosen={chosen} setPicker={setPicker} setChosen={setChosen} cpuscore={cpuscore} setCpuScore={setCpuScore} />
    </div>

  )
}

export default App
