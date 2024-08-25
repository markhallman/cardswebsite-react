import Hand from '../components/Hand'

function HeartsGame(){
    var fullHand = [["2","C"],["3","D"],["4","H"],["12", "D"]];

    return (
        <>
            <Hand cards={fullHand} />
        </>
    );
}

export default HeartsGame;