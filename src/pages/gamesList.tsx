import Banner from '../components/Banner'
import { useState } from 'react';
import axios from "axios";

function GamesList(){
    let listPages = ["Home", "Downloads", "HeartsLobbyJoin", "GamesList" ]

    const [activeGames, setActiveGames] = useState(0);

    // TODO: Obviously, we will need to get actual user credentials here in the future
    var username = "user";
    var password = "password";
    var basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

    async function getActiveGames() {
        console.log("Get Active Button clicked");
        axios.get("http://localhost:8080/games/activegames", {
            headers: {Authorization: basicAuthHeader}
        }).then((response)=>{
            console.log(response.data);
            let activeGames = response.data.activeGames;
            activeGames.forEach(game => {
                console.log(game.gameId);
            });
            setActiveGames(activeGames);
            return activeGames;
            // TODO: figure out how to grab active games from request and extract the data
        }).catch((error) => {
            console.error("Error grabbing active games:", error);
        });
    }

    return (
        <>
            <h1><Banner pages={listPages} activePage="GamesList" /></h1>
            <div className="content-area p-3">
                <div className="wrapper">
                            <h1>Active Games</h1>
                            {activeGames.length > 0 ? (
                                <ul>
                                    {activeGames.map((game, index) => (
                                        <li key={index}>
                                            Game ID: {game.gameId}, Name: {game.players[0].name}
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