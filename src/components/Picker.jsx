function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function Picker({ possibilities }) {
    const estratto = getRandomInt(possibilities.length)

    return <>
        <h3>Il valore estratto è: {possibilities[estratto]}</h3>
    </>
}

export default Picker