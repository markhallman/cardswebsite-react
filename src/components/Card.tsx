export type Suit = "C" | "D" | "H" | "S";
export type Location = "Top" | "Bottom" | "Left" | "Right";

function cardToImage(suit : Suit, rank : string){
    return rank + suit + ".png"
}

interface CardProps {
    rank: string;
    suit?: Suit;
    pad: number;
    location?: Location;
}

function cardClick(suit: Suit, rank : string){
    console.log("card clicked: " + rank + suit);
}

function Card( {rank, suit = 'C', pad, location = "Bottom"} : CardProps) {
    const cardImage = cardToImage(suit, rank);
    let index = pad["index"]
    let cardPadding = pad["index"] * 30

    let cardStyle = {
        marginLeft: cardPadding,
    }

    if (location == "Left" ||  location == "Right") {
        cardStyle = {
            transform: 'rotate(90deg)',
            marginTop: 200 + cardPadding,
            marginLeft: '30px'
        }
    }

    console.log(location)

    return (
            <div className={"cardHolder"} style={cardStyle}>
                  <img className="playingCard" src={"./src/assets/cards/" + cardImage} onClick={() => cardClick(suit, rank)} />
            </div>
        );
}

export default Card;