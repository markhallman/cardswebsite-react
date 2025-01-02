import { useNavigate, useParams } from "react-router-dom";
import StartGameButton from '../components/StartGameButton'
import { useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { UserContext } from "../context/UserContext";
import { subscribeToLobby, unsubscribeFromLobby, useWebSocket } from "../utils/webSocketUtil";


function HeartsLobby(){
    const { gameId } = useParams<{ gameId: string }>();
    const numericGameId : number = Number(gameId);

    const userContext = useContext(UserContext);
    const { username, token } = userContext;
    const { client, isConnected} = useWebSocket(token);

    // TODO : figure out acual type for these
    const [players, setPlayers] = useState<string[] | undefined>(undefined);
    const [rulesConfig, setRulesConfig] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!token) {
            console.error("No token found in user context");
            return;
        }

        if(isConnected && client) {
            subscribeToLobby(gameId, setRulesConfig, setPlayers);
        }

        return () => {
            if(isConnected && client){
                unsubscribeFromLobby(gameId);
            }
        };
    }, [token, isConnected]);

    // TODO: Probably want some sort of heartbeat with the user so we can tell if they disconnect weirdly
    // TODO: Functinallity for removing lobbies that dont have any active users
    // TODO: If a user visits this page, and the game is already started, they should be redirected to the game page
    return (
        <>
            <div className="content-area p-3">
                <div className="wrapper">
                    <h1>Welcome to the game lobby!</h1>
                    {numericGameId ? <p>Game ID: {numericGameId}</p> : <p>No game found!</p>}
                    <StartGameButton gameId={numericGameId} gameClient={client}/>
                </div>
            </div>
        </>
    );
}

export default HeartsLobby;