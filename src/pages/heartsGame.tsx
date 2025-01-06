import Hand from '../components/Hand'
import CardTable from '../components/CardTable'
import { useEffect, useState, useRef, createContext, Context, useContext } from 'react';
import { unstable_usePrompt, useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { reindexPlayerArray } from '../utils/cardGameUtils';
import { GameContext } from '../context/GameContext';
import { UserContext } from '../context/UserContext';
import { subscribeToGame, unsubscribeFromGame, useWebSocket } from '../utils/webSocketUtil';
import Scoreboard from '../components/Scoreboard';

export type ScoreboardObj = {
    playerScores : Map<string, number>
}

function HeartsGame() {
    const { gameId } = useParams<{ gameId: string }>();
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
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [scoreboard, setScoreboard] = useState<ScoreboardObj | undefined>(undefined);

    // Player order reflects the respoective positions of players at the table, 
    //  not the current order exactly since it doesnt change with trick wins
    const [playerOrder, setPlayerOrder] = useState<string[] | undefined>(undefined);
    const { client, isConnected  } = useWebSocket(token);

    // TODO: If we miss the initial message, we should probably have a way to request the current game state so its not broken
        // page refresh will fix, but we should have a way to recover from this

    unstable_usePrompt({
        message: "Are you sure you want to leave? You will be removed from the lobby",
        when: ({ currentLocation, nextLocation }) =>
        currentLocation.pathname !== nextLocation.pathname,
    });

    useEffect(() => {
        if(!token) {  
            console.error("No token found in user context");
            return;  
        }

        if (client && isConnected) {
            console.log("WebSocket client connected, subscribing to game.");
            subscribeToGame(gameId, playerName, setPlayerOrder, setFullHand, setTableCards, setScoreboard);
        } else {
            console.log("Client not initialized, retrying");
        }

        return () => {
            if(client && isConnected) {
                console.log("Unsubscribing from game");
                unsubscribeFromGame(gameId)
            }
        };
    }, [gameId, client, isConnected]);

    return (
        <>
            <GameContext.Provider value={{gameWebSocketRoot: `/app/hearts/game-room/${gameId}`, stompClient: client || undefined}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col mt-2">
                            <button className="btn btn-success" onClick={()=> setShowPopup(!showPopup)} >Scoreboard</button>
                        </div>
                    </div>
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
                    <Scoreboard trigger={showPopup} setTrigger={setShowPopup} scoreboard={scoreboard}></Scoreboard>
                </div>
            </GameContext.Provider>
        </>
    );
}

export default HeartsGame;