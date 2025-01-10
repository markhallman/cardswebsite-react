import { unstable_usePrompt, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { subscribeToLobby, unsubscribeFromLobby, useWebSocket } from "../utils/webSocketUtil";
import PlayerDisplay from "../components/PlayerDisplay";
import RulesConfigEditor, { RulesConfig } from "../components/RulesConfigEditor";
import { GameContext } from "../context/GameContext";

function HeartsLobby(){
    const { gameId } = useParams<{ gameId: string }>();
    const numericGameId : number = Number(gameId);

    const userContext = useContext(UserContext);
    const { username, token } = userContext;
    const gameWebSocketRoot = `/app/hearts/game-lobby/${gameId}`;


    // TODO : figure out acual type for players
    const [players, setPlayers] = useState<string[] | undefined>(undefined);
    const [rulesConfig, setRulesConfig] = useState<RulesConfig | undefined>(undefined);


    const handleConnect = () => {
        console.log("WebSocket connected, subscribing to lobby");
        subscribeToLobby(gameId, setRulesConfig, setPlayers, navigate);
    };

    const { client, isConnected } = useWebSocket(token, handleConnect);

    const startGame = () => {
        if (client && isConnected) {
            client.publish({
                destination: gameWebSocketRoot + "/startGame"});
            console.log(`Game with id ${gameId} started`);
        } else {
            console.error("Issue starting game, websocket not connected");
        }
    };


    const navigate = useNavigate();

    // Block navigating elsewhere when data has been entered into the input
    unstable_usePrompt({
        message: "Are you sure you want to leave? You will be removed from the lobby",
        when: ({ currentLocation, nextLocation }) =>
            !nextLocation.pathname.includes("heartsGame") &&
            currentLocation.pathname !== nextLocation.pathname,
    });

    useEffect(() => {
        if (!token) {
            console.error("No token found in user context");
            return;
        }

        return () => {
            if(isConnected && client){
                console.log("Unsubscribing from lobby");
                unsubscribeFromLobby(gameId);
            }
        };
    }, [token, isConnected]);

    // TODO: Functinallity for removing lobbies that dont have any active users
    // TODO: If a user visits this page, and the game is already started, they should be redirected to the game page
    // TODO: numPlayers should be actually configurable, sourced from RulesConfig
    // TODO: management of gameIsStarting is off... if a user starts the game and quickly backs out could be wonky
    return (
        <>
            <GameContext.Provider value={{gameWebSocketRoot: gameWebSocketRoot, stompClient: client || undefined}}>
                <div className="content-area p-3">
                    <div className="wrapper">
                        <h1>Welcome to the game lobby!</h1>
                        {numericGameId ? <p>Game ID: {numericGameId}</p> : <p>No game found!</p>}
                        <button onClick={startGame}>
                            Start Game
                        </button>
                        <RulesConfigEditor rulesConfig={rulesConfig}/>
                        <PlayerDisplay players={players} numPlayers={4}/>
                    </div>
                </div>
            </GameContext.Provider>
        </>
    );
}

export default HeartsLobby;