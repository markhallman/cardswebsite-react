export type Suit = "C" | "D" | "H" | "S"

function cardToImage(suit : Suit, rank : string){
    return rank + suit + ".png"
}

interface CardProps {
    rank: string;
    suit?: Suit;
    pad: number;
}

function cardClick(suit: Suit, rank : string){
    console.log("card clicked: " + rank + suit);
}

function Card( {rank, suit = 'C', pad} : CardProps) {
    const cardImage = cardToImage(suit, rank);
    let index = pad["index"]
    let cardPadding = pad["index"] * 50
    return (
            <div className={"cardHolder col-" + index + " img-move thumb"} style={{marginLeft: cardPadding}}>
                  <img className="playingCard" src={"./src/assets/cards/" + cardImage} onClick={() => cardClick(suit, rank)} />
            </div>
        );
}

export default Card;