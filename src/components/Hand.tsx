import Card from '../components/Card'
import Draggable, {DraggableCore} from 'react-draggable';

// TODO: Either add useState call here to get hand contents, or make a PlayerView class that manages it

interface HandProps {
    cards: string[][];
    location: string;
    isPlayer: Boolean;
}

function showCard(suit: Suit, rank : string){
    console.log("card clicked: " + rank + suit);
}

function getStyle(padding : int, location: string){
    padding = padding * 30
    let cardStyle = {
        //marginLeft: padding,
        transform : `translateX(${(padding)}%)`
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
                      <div className={"cardHolder"} key={index} style={getStyle(index, location)}>
                            <Card rank={card[0]} suit={card[1]} isPlayer={isPlayer} />
                      </div> )}
            </div>
        );
}

export default Hand;