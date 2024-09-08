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

function Hand( {cards, location, isPlayer} : HandProps){
    return (
            <div className="hand">
                  {cards.map( (card, index) =>
                      <Card rank={isPlayer ? card[0] : "yellow_back"} suit={isPlayer ? card[1] : ""} pad={{index}} key={card} location={location} /> )}
            </div>
        );
}

export default Hand;