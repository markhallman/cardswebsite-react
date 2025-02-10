import axios from "axios";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { apiBaseUrl } from "../utils/webSocketUtil";

interface joinButtonProps {
    gameId : number;
}

function JoinGameButton( {gameId} : joinButtonProps ) {
    const navigate = useNavigate();

    const userContext = useContext(UserContext);

    async function joinGame() {
        console.log("Join Game Button clicked for gameId " + gameId);
        axios.post<String>(`${apiBaseUrl}/games/joingame/${gameId}`, {},
            {withCredentials: true}).then((response)=>{
            console.log("Joining game");
            console.log("GameId: " + gameId);
            navigate(`/heartsLobby/${gameId}`)
        }).catch((error) => {
            console.error("Error joining game:", error);
        });
    }

    return (
        <button className="btn btn-primary" onClick={joinGame}>
            Join Game
        </button>
    )
}

export default JoinGameButton