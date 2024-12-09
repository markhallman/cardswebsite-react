export type Suit = "C" | "D" | "H" | "S";
export type Location = "Top" | "Bottom" | "Left" | "Right";

function cardToImage(suit : Suit, rank : string){
    return rank + suit + ".png"
}

interface CardProps {
    rank: string;
    suit?: Suit;
    isPlayer: Boolean;
    onClick? : (event: React.MouseEvent<HTMLImageElement>) => void;
    height?: number;
}

function defaultCardClick() {
    console.log("Card Clicked")
}

function Card( {rank, suit = 'C', isPlayer, onClick = defaultCardClick} : CardProps, height = 120) {
    // If this is the users hand, show cards. Otherwise show the generic yellow back of the card
    const cardImage = isPlayer ? cardToImage(suit, rank) : "yellow_back.png";
    let playerClass = isPlayer ? "playerCard" : "opponentCard";

    return (
            <img className={"playingCard " + playerClass}
                    src={"./src/assets/cards/" + cardImage}
                    onClick={onClick}
                    height={height}/>
        );
}

export default Card;