import possibilities from './data/possibilities.js'
import Picker from './components/Picker.jsx'
import Matcher from './components/Matcher.jsx'
import Chooser from './components/Chooser.jsx'

function App() {
  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <h2>Choose between Rock, Paper or Scissor e discover if you won!</h2>
      <Picker possibilities={possibilities} />
    </div>

  )
}

export default App
