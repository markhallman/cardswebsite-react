import { Client } from "@stomp/stompjs";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import { UserContext } from '../context/UserContext';
import { cardRankToValue } from "../utils/cardGameUtils";
import { apiBaseUrl } from "../utils/webSocketUtil";
import { motion } from "motion/react"

export type Suit = "CLUB" | "DIAMOND" | "HEART" | "SPADE";
export type Location = "Top" | "Bottom" | "Left" | "Right";

interface CardProps {
    rank: string;
    suit?: Suit;
    isPlayer: Boolean;
    onClick? : string;
    height?: number;
    style: {};
}

function defaultCardClick() {
    console.log("Card Clicked")
}

function playCard(rank : string, suit: string, gameWebSocketRoot : string, username? : string, stompClient? : Client) {
    if (!stompClient || !stompClient.connected) {
        console.error("WebSocket connection is not open");
        return;
    }

    if(!username) {
        console.error("Username not provided");
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
    });

    console.log("User card clicked and message sent:", messageBody);
}

function Card( {rank, suit = 'CLUB', isPlayer, onClick = "default", style} : CardProps, height = 120) {
    const gameContext = useContext(GameContext);
    const gameWebSocketRoot = gameContext.gameWebSocketRoot;
    const stompClient = gameContext.stompClient;

    const userContext = useContext(UserContext);
    const username = userContext.username;
    const [imageUrl, setImageUrl] = useState("");

    const rankString = isPlayer ? cardRankToValue(rank) : "back";

``
    // If this is the users hand, show cards. Otherwise show the generic yellow back of the card
    let playerClass = isPlayer ? "playerCard" : "opponentCard";

    useEffect(() => {
        const fetchCardImage = async () => {
            const response = await axios.get(
                `${apiBaseUrl}/images/card/default/${suit}/${rankString}`,
                { responseType: "blob"},
            );
            setImageUrl(URL.createObjectURL(response.data));
        }
        fetchCardImage();

    }, [rank, suit]);

    var onClickLocal;
    if (onClick == "default")  {
        onClickLocal = defaultCardClick
    } else if (onClick == "playCard") {
        onClickLocal = () => playCard(rank, suit, gameWebSocketRoot, username, stompClient);
    } else {
        console.error("Invalid onClick value:", onClick);
        onClickLocal = defaultCardClick;
    }

    return (
        <motion.div
            style={style}
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0.5, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            layout>
            <div className={"cardHolder"} >
                <img className={"playingCard " + playerClass}
                        src={imageUrl}
                        onClick={onClickLocal}
                        height={height}/>
            </div>
        </motion.div> 
    );
}

export default Card;