import Card, { Suit } from '../components/Card';
import { CardObj } from '../pages/heartsGame';

// TODO: Either add useState call here to get hand contents, or make a PlayerView class that manages it

interface HandProps {
    cards?: CardObj[]; 
    location: string;
    isPlayer: Boolean;
    onClick? : string;
}

function showCard(suit: Suit, rank : string){
    console.log("card clicked: " + rank + suit);
}

function getStyle(padding : number, location: string){
    padding = padding * 20

    if (location == "Left" ||  location == "Right") {
        return {
            transform: 'rotate(90deg)',
            marginLeft: 30,
            marginTop: 200 + padding
        }
    }

    return {
        transform : `translateX(${(padding)}%)`,
        marginLeft: padding,
    }
}

// Notice default onClick implementation is to just do nothing
function Hand( {cards, location, isPlayer, onClick = "default"} : HandProps){
    // TODO: This charAt system for grabbing the suit is a bit hacky, but it works for now
    return (
            <div className="hand">
                  {cards?.map( (card, index) =>
                      <div className={"cardHolder"} key={index} style={getStyle(index, location)}>
                            <Card rank={card.rank} suit={card.suit as Suit} isPlayer={isPlayer} onClick={onClick}/>
                      </div> )}
            </div>
        );
}

export default Hand;