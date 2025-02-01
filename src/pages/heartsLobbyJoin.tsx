import axios from "axios";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { apiBaseUrl } from "../utils/webSocketUtil";

function HeartsLobbyJoin(){
    // TODO: have some sort of heartbeat with the server so that we can tell if it is up or down
    let downloadsPages = ["Home", "Downloads", "HeartsLobbyJoin", "GamesList"]

    const navigate = useNavigate();

    async function createGame() {
        console.log("Create Game Button clicked");

        axios.post(`${apiBaseUrl}/games/creategame/hearts`, {},
             {withCredentials: true}
        ).then((response)=>{
            console.log("Creating lobby for GameId: " + response.data);
            var gameId = response.data;
            navigate(`/heartsLobby/${gameId}`)
        }).catch((error) => {
            console.error("Error creating game:", error);
        });
    }

    return (
        <>
            <div className="content-area p-3">
                <div className="wrapper">
                    <p>
                        Landing page for creating a hearts lobby
                    </p>
                    <div className="gameCreator">
                        <p>
                            TODO is to add an interface for rules selection
                        </p>
                        <button onClick={createGame}>
                            Create Game
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeartsLobbyJoin;