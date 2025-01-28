import { useContext, useEffect, useState } from 'react';
import { unstable_usePrompt, useParams } from 'react-router-dom';
import CardTable from '../components/CardTable';
import Hand from '../components/Hand';
import Scoreboard from '../components/Scoreboard';
import { GameContext } from '../context/GameContext';
import { UserContext } from '../context/UserContext';
import { reindexPlayerArray } from '../utils/cardGameUtils';
import { subscribeToGame, unsubscribeFromGame, useWebSocket } from '../utils/webSocketUtil';
import PlayerCard from '../components/PlayerCard';
import PlayerDisplay from '../components/PlayerDisplay';

// TODO: Move these types to a shared location? Type definition file?
export type Player = {
    name: string;
    humanControlled: boolean;
    id: string;
    icon: string;
}

export type CardObj = {
    suit: string;
    value: string;
    rank: string;
}

export type ScoreboardObj = {
    playerScores : Map<string, number>
}

export type GameState = {
    fullHand : CardObj[];
    tableCards : Map<string, CardObj>;
    playerOrder : Player[];
    scoreboard : ScoreboardObj;
    currentPlayer : Player;
}

function HeartsGame() {
    const { gameId } = useParams<{ gameId: string }>();
    const userContext = useContext(UserContext);

    if(!userContext) {  
        console.error("UserContext not found for some reason");
        return null;
    }
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [gameState, setGameState] = useState<GameState | undefined>(undefined);
    console.log(gameState);

    const {username, token}= userContext;
    const playerName = username;

    const player = gameState?.playerOrder.find(player => player.name === playerName);
    console.log(player)

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
            // TODO: recfactor to use a single set state function, so we dont have to pass a million of them
            //          maybe that involves just having a single gameState object that we pass around
            subscribeToGame(gameId, playerName, setGameState);
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
                    <div className="d-flex row justify-content-center" >
                        <div className="opponentDisplay p-0 col-6" >
                            <PlayerCard playerName={gameState?.playerOrder[2].name} 
                                        iconEndpoint={gameState?.playerOrder[2].icon} 
                                        activePlayer={gameState?.currentPlayer.name === gameState?.playerOrder[2].name}/>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="opponentDisplay col">
                            <PlayerCard playerName={gameState?.playerOrder[1].name} 
                                        iconEndpoint={gameState?.playerOrder[1].icon} 
                                        activePlayer={gameState?.currentPlayer.name === gameState?.playerOrder[1].name}/>    
                        </div>
                        <div className="col-6 align-self-center">
                            <CardTable playerTrickMap={gameState?.tableCards}  playerConfiguration={reindexPlayerArray(playerName, gameState?.playerOrder)}/>
                        </div>
                        <div className="opponentDisplay col-2 justify-content-right m-6">
                            <PlayerCard playerName={gameState?.playerOrder[3].name} 
                                        iconEndpoint={gameState?.playerOrder[3].icon} 
                                        activePlayer={gameState?.currentPlayer.name === gameState?.playerOrder[3].name}/>                        </div>
                        </div>
                    <div className="row d-flex">
                        <div className="position-absolute bottom-0 start-0 col-3 p-5">
                            <PlayerCard playerName={username} 
                                        iconEndpoint={player?.icon} 
                                        activePlayer={gameState?.currentPlayer.name==username}/>
                        </div>
                        <div className="col bottomHand offset-4 fixed-bottom">
                            <Hand cards={gameState?.fullHand} location="Bottom" isPlayer={true} onClick={"playCard"}/>
                        </div>
                    </div>
                    <Scoreboard trigger={showPopup} setTrigger={setShowPopup} scoreboard={gameState?.scoreboard}></Scoreboard>
                </div>
            </GameContext.Provider>
        </>
    );
}

export default HeartsGame;