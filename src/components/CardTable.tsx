import Card, { Suit } from '../components/Card'

interface CardTableProps {
    cards: [rank: string, suit: Suit][]; 
    playerConfiguration?: string[];
    playerTrickMap?: Map<string, [string, Suit]>;
}

function getTableCardStyle(index : number) {
    // Get the position of the card on the table based on index
    let cardStyle = {}
    if (index == 0) {
        cardStyle = {
            marginLeft: 165,
            marginTop: 10
        }
    } else if(index == 1) {
        cardStyle = {
            marginLeft: 300,
            marginTop: 100
        }
    } else if(index == 2) {
        cardStyle = {
            marginLeft: 165,
            marginTop: 170
        }
    } else if(index == 3) {
        cardStyle = {
            marginLeft: 20,
            marginTop: 100
        }
    }

    return cardStyle;
}

// TODO: Need to reconfigure so that the cards are displayed in the correct order, with a map from player to card
function CardTable( {cards} : CardTableProps){
    return (
            <div className="cardTable">
               {cards.map( (card, index) =>
                  <div className={"cardHolder"} key={index} style={getTableCardStyle(index)}>
                      <Card rank={card[0]} suit={card[1]} isPlayer={true} key={index}/>
                  </div>)}
            </div>
        );
}

export default CardTable;