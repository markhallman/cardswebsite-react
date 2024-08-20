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
    let index = pad["index"]
    let cardPadding = index * 50
    console.log(cardPadding);

    return (
            <div className="cardHolder col-2 img-move thumb" style={{paddingLeft: cardPadding}}>
                  <img className="playingCard" src={"./src/assets/cards/" + cardImage} />
            </div>
        );
}

export default Card;