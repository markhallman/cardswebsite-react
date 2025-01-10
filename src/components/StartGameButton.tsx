import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Client } from '@stomp/stompjs';
import { useWebSocket } from '../utils/webSocketUtil';
import { GameContext } from '../context/GameContext';

interface startButtonProps {
    gameId : number;
    gameClient : Client | null,
};

function StartGameButton( {gameId, gameClient} : startButtonProps ) {
    const navigate = useNavigate();
    
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);

    if(!userContext) {  
        console.error("UserContext not found for some reason");
        return null;
    }
    
    const { client, isConnected} = useWebSocket(userContext.token);

    const startGame = () => {
        if (client && isConnected) {
            // TODO: the gameContext isnt actually set here! Its defaulting, need to either
            //  define to match the lobby connection OR add a LobbyContext
            console.log(gameContext.gameWebSocketRoot + "/startGame");
            client.publish({
                destination: gameContext.gameWebSocketRoot + "/startGame"});
            console.log(`Game with id ${gameId} started`);
        } else {
            console.error("Issue starting game, websocket not connected");
        }
    };

    return (
        <button onClick={startGame}>
            Start Game
        </button>
    )
}

export default StartGameButton