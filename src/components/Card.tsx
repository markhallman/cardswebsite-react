import { useContext } from "react";
import { UserContext } from '../context/UserContext';
import { Client } from "@stomp/stompjs";
import { cardRankToValue } from "../utils/cardGameUtils";

export type Suit = "CLUB" | "DIAMOND" | "HEART" | "SPADE";
export type Location = "Top" | "Bottom" | "Left" | "Right";

function cardToImage(suit : Suit, rank : string){
    return rank + suit.charAt(0) + ".png"
}

interface CardProps {
    rank: string;
    suit?: Suit;
    isPlayer: Boolean;
    onClick? : string;
    height?: number;
}

function defaultCardClick() {
    console.log("Card Clicked")
}

function playCard(rank : string, suit: string, username : string, gameWebSocketRoot : string, stompClient? : Client) {
    if (!stompClient || !stompClient.connected) {
        console.error("WebSocket connection is not open");
        return;
    }

    const messageBody = JSON.stringify({
        card: {rank: rank, suit: suit, value: cardRankToValue(rank)},
        playerName: username,
        messageType: "PlayCardMessage"
    });

    stompClient.publish({
        destination: gameWebSocketRoot + "/playCard",
        body: messageBody,
        headers: {
            "user-name": username
        }
    });

    console.log("User card clicked and message sent:", messageBody);
    
    console.log("User card clicked");
}

function Card( {rank, suit = 'CLUB', isPlayer, onClick = "default"} : CardProps, height = 120) {
    const userContext = useContext(UserContext);
    const username = userContext.username;
    const gameWebSocketRoot = userContext.gameWebSocketRoot;
    const stompClient = userContext.stompClient;

    // If this is the users hand, show cards. Otherwise show the generic yellow back of the card
    const cardImage = isPlayer ? cardToImage(suit, rank) : "yellow_back.png";
    let playerClass = isPlayer ? "playerCard" : "opponentCard";

    var onClickLocal;
    if (onClick == "default")  {
        onClickLocal = defaultCardClick
    } else if (onClick == "playCard") {
        onClickLocal = () => playCard(rank, suit, username, gameWebSocketRoot, stompClient);
    } else {
        console.error("Invalid onClick value:", onClick);
        onClickLocal = defaultCardClick;
    }

    return (
            <img className={"playingCard " + playerClass}
                    src={"./src/assets/cards/" + cardImage}
                    onClick={onClickLocal}
                    height={height}/>
        );
}

export default Card;