function resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore, setSentence) {
    setScore(0);
    setCpuScore(0);
    setMatches(0);
    setPicker('start');
    setChosen('start');
    setResult('');
    setSentence('');
}
export default resetCounters