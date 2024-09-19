import Card from '../components/Card'

interface HandProps {
    cards: string[][];
    location: string;
    isPlayer: Boolean;
}
// TODO: rather than doing the margins in the card to give spacing, we should do it based on where the hand is on the screen from this class

function showCard(suit: Suit, rank : string){
    console.log("card clicked: " + rank + suit);
}

function getStyle(padding : int, location: string){
    padding = padding * 30
    let cardStyle = {
        marginLeft: padding,
    }

    if (location == "Left" ||  location == "Right") {
        cardStyle = {
            transform: 'rotate(90deg)',
            marginTop: 200 + padding,
            marginLeft: '30px'
        }
    }

    return cardStyle;
}

function Hand( {cards, location, isPlayer} : HandProps){

    return (
            <div className="hand">
                  {cards.map( (card, index) =>
                      <div className={"cardHolder"} style={getStyle(index, location)}>
                            <Card rank={card[0]} suit={card[1]} isPlayer={isPlayer} />
                      </div> )}
            </div>
        );
}

export default Hand;