import { useNavigate, useParams } from "react-router-dom";
import StartGameButton from '../components/StartGameButton'
import { useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { UserContext } from "../context/UserContext";
import { deactivateWebSocket, getWebSocketClient, initWebSocket, lobbyConnect } from "../utils/webSocketUtil";


function HeartsLobby(){
    const { gameId } = useParams<{ gameId: string }>();
    const numericGameId : number = Number(gameId);

    const userContext = useContext(UserContext);
    const { username, token } = userContext;
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {

        if (!token) {
            console.error("No token found in user context");
            return;
        }
        initWebSocket(token).then(() => {   
            console.log("WebSocket connection established in lobby");

            const client : Client = getWebSocketClient();
            if (!client) {
                console.error("Game client not initialized properly");
                return;
            }

            lobbyConnect(token);
            setStompClient(client);
        });


        return () => {
            console.log("Closing page");
        };
    }, [token]);

    // TODO: Probably want some sort of heartbeat with the user so we can tell if they disconnect weirdly
    // TODO: Functinallity for removing lobbies that dont have any active users
    // TODO: If a user visits this page, and the game is already started, they should be redirected to the game page
    return (
        <>
            <div className="content-area p-3">
                <div className="wrapper">
                    <h1>Welcome to the game lobby!</h1>
                    {numericGameId ? <p>Game ID: {numericGameId}</p> : <p>No game found!</p>}
                    <StartGameButton gameId={numericGameId} gameClient={stompClient}/>
                </div>
            </div>
        </>
    );
}

export default HeartsLobby;