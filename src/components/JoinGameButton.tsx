import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface joinButtonProps {
    gameId : number;
}

function JoinGameButton( {gameId} : joinButtonProps ) {
    const navigate = useNavigate();

    // TODO: Obviously, we will need to get actual user credentials here in the future
    var username : string = "mark";
    var password : string = "markiscool";
    var basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

    async function joinGame() {
        console.log("Join Game Button clicked for gameId " + gameId);
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
        <button onClick={joinGame}>
            Join Game
        </button>
    )
}

export default JoinGameButton