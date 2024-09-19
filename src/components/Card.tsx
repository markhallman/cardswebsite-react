export type Suit = "C" | "D" | "H" | "S";
export type Location = "Top" | "Bottom" | "Left" | "Right";

function cardToImage(suit : Suit, rank : string){
    return rank + suit + ".png"
}

interface CardProps {
    rank: string;
    suit?: Suit;
    isPlayer: Boolean;
}

function cardClick(suit: Suit, rank : string, isPlayer : Boolean){
    if(isPlayer){
        console.log("Card Clicked")
    }
}

function Card( {rank, suit = 'C', pad, location = "Bottom", isPlayer} : CardProps) {
    // If this is the users hand, show cards. Otherwise show the generic yellow back of the card
    const cardImage = isPlayer ? cardToImage(suit, rank) : "yellow_back.png";
    let playerClass = isPlayer ? "playerCard" : "opponentCard";

    return (
            <img className={"playingCard " + playerClass} src={"./src/assets/cards/" + cardImage} onClick={() => cardClick(suit, rank, isPlayer)} />
        );
}

export default Card;