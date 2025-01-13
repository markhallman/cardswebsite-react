import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import JoinGameButton from '../components/JoinGameButton';
import { RulesConfig } from '../components/RulesConfigEditor';
import { UserContext } from '../context/UserContext';

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
    let listPages = ["Home", "Downloads", "HeartsLobbyJoin", "GamesList" ]

    const [activeGames, setActiveGames] = useState<Game[]>([]);

    const userContext = useContext(UserContext);
    const {username, token} = userContext;
    var tokenAuthHeader : string = `Bearer ${token}`;

    async function getActiveGames() {
        console.log("Get Active Button clicked");
        axios.get<ActiveGames>("http://localhost:8080/games/activegames", {
            headers: {Authorization: tokenAuthHeader}
        }).then((response)=>{
            console.log(response.data);
            const activeGames = response.data.activeGames;
            setActiveGames(activeGames);
            return activeGames;
        }).catch((error) => {
            console.error("Error grabbing active games:", error);
        });
    }

    // Fetch active games when the component mounts
    useEffect(() => {
        getActiveGames();
    }, []); // Empty dependency array ensures this runs only once

    return (
        <>
            <div className="content-area p-3">
                <div className="wrapper">
                            <h1>Active Games</h1>
                            {activeGames.length > 0 ? (
                                <ul className="vstack list-unstyled d-flex flex-wrap">
                                    {activeGames.map((game, index) => (
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
                        <button onClick={getActiveGames}>
                            Update Active Games List
                        </button>
                </div>
            </div>
        </>
    );
}

export default GamesList;