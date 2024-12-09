import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';

interface startButtonProps {
    gameId : number;
}

function StartGameButton( {gameId} : startButtonProps ) {
    const [ws, setWs] = useState<WebSocket | null>(null);

    const navigate = useNavigate();

    // TODO: Obviously, we will need to get actual user credentials here in the future
    var username : string = "user";
    var password : string = "password";
    var basicAuthHeader : string = 'Basic ' + btoa(username + ':' + password);

    async function startGame() {
        console.log("Start Game Button clicked for gameId " + gameId);
        axios.post<String>(`http://localhost:8080/games/startgame/${gameId}`, {}, {
            headers: {Authorization: basicAuthHeader}
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