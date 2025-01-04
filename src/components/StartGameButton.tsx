import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Client } from '@stomp/stompjs';

interface startButtonProps {
    gameId : number;
    gameClient : Client | null,
    setGameIsStarting : React.Dispatch<React.SetStateAction<boolean>>
};

function StartGameButton( {gameId, gameClient, setGameIsStarting} : startButtonProps ) {
    const navigate = useNavigate();
    
    const userContext = useContext(UserContext);

    if(!userContext) {  
        console.error("UserContext not found for some reason");
        return null;
    }

    const {username, token} = userContext;
    var tokenAuthHeader : string = `Bearer ${token}`;

    async function startGame() {
        setGameIsStarting(true);

        if (!gameClient) {
            console.error("Game client not initialized properly");
            return;
        }

        console.log("Start Game Button clicked for gameId " + gameId);
        axios.post<String>(`http://localhost:8080/games/startgame/${gameId}`, {}, {
            headers: {Authorization: tokenAuthHeader}
        }).then((response)=>{
            console.log("Starting game with ID " + gameId);
            navigate(`/heartsGame/${gameId}`);
        }).catch((error) => {
            console.error("Error creating game:", error);
        });
    }

    return (
        <button onClick={startGame}>
            Start Game
        </button>
    )
}

export default StartGameButton