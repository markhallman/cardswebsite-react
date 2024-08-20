export type Suit = "C" | "D" | "H" | "S"

function cardToImage(suit : Suit, rank : string){
    return rank + suit + ".png"
}

interface CardProps {
    rank: string;
    suit?: Suit;
    pad: number;
}

function Card( {rank, suit = 'C', pad} : CardProps) {
    const cardImage = cardToImage(suit, rank);
    let cardPadding = pad["index"] * 50

    return (
            <div className="cardHolder col img-move thumb" style={{paddingLeft: cardPadding}}>
                  <img className="playingCard" src={"./src/assets/cards/" + cardImage} />
            </div>
        );
}

export default Card;