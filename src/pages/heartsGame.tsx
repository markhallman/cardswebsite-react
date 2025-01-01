import Hand from '../components/Hand'
import CardTable from '../components/CardTable'
import { useEffect, useState, useRef, createContext, Context, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { reindexPlayerArray, parseNameFromPlayerDescriptorString, sortCards } from '../utils/cardGameUtils';
import { GameContext } from '../context/GameContext';
import { UserContext } from '../context/UserContext';
import { initWebSocket, subscribeToGame, useWebSocket } from '../utils/webSocketUtil';

// TODO: If a user navigates away from the game page, they should be removed from the game
//          thusly a message should be sent to the server to remove them from the game probably want a heartbeat
//          to ensure that the user is still connected to the game
//          User should also be directed away from this page if the game is not active on the server
//          User should be warned if they are about to navigate away from the page while the game is active

function HeartsGame() {
    const { gameId } = useParams<{ gameId: string }>();
    const location = useLocation();
    const userContext = useContext(UserContext);

    if(!userContext) {  
        console.error("UserContext not found for some reason");
        return null;
    }

    const {username, token}= userContext;
    const playerName = username;
    const [fullHand, setFullHand ]= useState<{suit : string, value : string, rank : string}[] >([]);
    const [tableCards, setTableCards ]= useState<Map<string, {suit : string, value : string, rank : string}>>(
        new Map([])
    );

    // Player order reflects the respoective positions of players at the table, 
    //  not the current order exactly since it doesnt change with trick wins
    const [playerOrder, setPlayerOrder] = useState<string[] | undefined>(undefined);
    const client = useWebSocket(token);

    useEffect(() => {
        if(!token) {  
            console.error("No token found in user context");
            return;  
        }

        if (client) {
            if (client.connected) {
                console.log("WebSocket client connected, subscribing to game.");
                subscribeToGame(gameId, playerName, setPlayerOrder, setFullHand, setTableCards);
            } else {
                console.log("Client not connected, setting onConnect");
                client.onConnect = () => {
                    subscribeToGame(gameId, playerName, setPlayerOrder, setFullHand, setTableCards);
                }
            }
        } else {
            console.log("Client not initialized, retrying");
        }
    

        return () => {
            console.log("Closing page");
        };
    }, [gameId, client]);

    return (
        <>
            <GameContext.Provider value={{gameWebSocketRoot: `/app/hearts/game-room/${gameId}`, stompClient: client || undefined}}>
                <div className="container-fluid">
                    <div className="row justify-content-center" >
                        <div className="col offset-4">
                            <Hand cards={fullHand} location="Top" isPlayer={false} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Hand cards={fullHand} location="Left" isPlayer={false} />
                        </div>
                        <div className="col-2 justify-content-right">
                            <Hand cards={fullHand} location="Right" isPlayer={false} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex col alight-items-center justify-content-center align-self-center">
                            <CardTable playerTrickMap={tableCards}  playerConfiguration={reindexPlayerArray(playerName, playerOrder)}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col fixed-bottom bottomHand offset-4">
                            <Hand cards={fullHand} location="Bottom" isPlayer={true} onClick={"playCard"}/>
                        </div>
                    </div>
                </div>
            </GameContext.Provider>
        </>
    );
}

export default HeartsGame;