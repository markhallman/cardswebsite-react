import Banner from '../components/Banner'
import JoinGameButton from '../components/JoinGameButton';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { UserContext } from '../context/UserContext';

interface Game {
    gameId : number;
    players : { name: string }[];
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
            let activeGames : Game[] = response.data.activeGames;
            activeGames.forEach((game: { gameId: number; }) => {
                console.log(game.gameId);
            });
            setActiveGames(activeGames);
            return activeGames;
            // TODO: figure out how to grab active games from request and extract the data
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
            <h1><Banner pages={listPages} activePage="GamesList" /></h1>
            <div className="content-area p-3">
                <div className="wrapper">
                            <h1>Active Games</h1>
                            {activeGames.length > 0 ? (
                                <ul className="vstack list-unstyled d-flex flex-wrap">
                                    {activeGames.map((game, index) => (
                                        <li key={index} className="list-group-item bg-secondary text-white border border-dark m-2 p-2 justify-content-center align-items-center gameRoom">
                                            <span className="p-2">
                                                Game ID: {game.gameId}, Room Owner: {game.players[0].name}
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