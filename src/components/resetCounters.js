function resetCounters(setScore, setMatches, setPicker, setChosen, setResult, setCpuScore) {
    setScore(0);
    setCpuScore(0);
    setMatches(0);
    setPicker('start');
    setChosen('start');
    setResult('');
}
export default resetCounters