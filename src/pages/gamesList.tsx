import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import JoinGameButton from '../components/JoinGameButton';
import { RulesConfig } from '../components/RulesConfigEditor';
import { UserContext } from '../context/UserContext';
import { apiBaseUrl } from "../utils/webSocketUtil";

interface Game {
    gameId : number;
    players : { name: string }[];
    gameIsStarted : boolean;
    rulesConfig : RulesConfig;
}

interface ActiveGames {
    activeGames : Game[];
}

// TODO: Should only display games that are not full or started

function GamesList(){
    const [activeLobbies, setActiveLobbies] = useState<Game[]>([]);



    async function getActiveLobbies() {
        console.log("Get Active Button clicked");
        axios.get<ActiveGames>(`${apiBaseUrl}/games/activeLobbies`, {
            withCredentials: true
        }).then((response)=>{
            console.log(response.data);
            const activeGames = response.data.activeGames;
            setActiveLobbies(activeGames);
            return activeGames;
        }).catch((error) => {
            console.error("Error grabbing active games:", error);
        });
    }

    useEffect(() => {
        getActiveLobbies();
    }, []); 

    return (
        <>
            <div className="content-area p-3">
                <div className="wrapper">
                            <h1>Active Games</h1>
                            {activeLobbies.length > 0 ? (
                                <ul className="vstack list-unstyled d-flex flex-wrap">
                                    {activeLobbies.map((game, index) => (
                                        <li key={index} className="list-group-item bg-secondary text-white border border-dark m-2 p-2 justify-content-center align-items-center gameRoom">
                                            <span className="p-2">
                                                Game ID: {game.gameId}, Open Slots: {game.rulesConfig.numPlayers - game.players.length}
                                            </span>
                                            <JoinGameButton gameId={game.gameId}/>
                                        </li>
                                    ))}
                                </ul>

                            ) : (
                                <p>No active games available.</p>
                            )}
                        <button onClick={getActiveLobbies}>
                            Update Active Games List
                        </button>
                </div>
            </div>
        </>
    );
}

export default GamesList;