import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

interface startButtonProps {
    gameId : number;
}

function StartGameButton( {gameId} : startButtonProps ) {
    const navigate = useNavigate();
    
    const userContext = useContext(UserContext);
    const {username, token} = userContext;
    var tokenAuthHeader : string = `Bearer ${token}`;

    async function startGame() {
        console.log("Start Game Button clicked for gameId " + gameId);
        axios.post<String>(`http://localhost:8080/games/startgame/${gameId}`, {}, {
            headers: {Authorization: tokenAuthHeader}
        }).then((response)=>{
            console.log("Starting game with ID " + gameId);
            navigate(`/heartsGame/${gameId}`)
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