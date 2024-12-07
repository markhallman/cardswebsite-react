import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface startButtonProps {
    gameId : number;
}

function StartGameButton( {gameId} : startButtonProps ) {
    const navigate = useNavigate();

    // TODO: Obviously, we will need to get actual user credentials here in the future
    var username = "user";
    var password = "password";
    var basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

    async function startGame() {
        console.log("Start Game Button clicked for gameId " + gameId);
        axios.post<String>(`http://localhost:8080/games/joingame/${gameId}`, {}, {
            headers: {Authorization: basicAuthHeader}
        }).then((response)=>{
            console.log("Joining game");
            console.log("GameId: " + gameId);
            navigate(`/heartsLobby/${gameId}`)
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