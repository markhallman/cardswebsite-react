import Card, { Suit } from '../components/Card'
import Draggable, {DraggableCore} from 'react-draggable';

// TODO: Either add useState call here to get hand contents, or make a PlayerView class that manages it

interface HandProps {
    cards: {suit : string, value : string, rank : string}[]; 
    location: string;
    isPlayer: Boolean;
    onClick? : string;
}

function showCard(suit: Suit, rank : string){
    console.log("card clicked: " + rank + suit);
}

function getStyle(padding : number, location: string){
    padding = padding * 30
    let cardStyle = {
        //marginLeft: padding,
        transform : `translateX(${(padding)}%)`
    }

    if (location == "Left" ||  location == "Right") {
        cardStyle = {
            transform: 'rotate(90deg)',
            marginLeft: '30px',
            marginTop: 200 + padding
        }
    }

    return cardStyle;
}

// Notice default onClick implementation is to just do nothing
function Hand( {cards, location, isPlayer, onClick = "default"} : HandProps){
    // TODO: This charAt system for grabbing the suit is a bit hacky, but it works for now
    return (
            <div className="hand">
                  {cards.map( (card, index) =>
                      <div className={"cardHolder"} key={index} style={getStyle(index, location)}>
                            <Card rank={card.rank} suit={card.suit.charAt(0) as Suit} isPlayer={isPlayer} onClick={onClick}/>
                      </div> )}
            </div>
        );
}

export default Hand;