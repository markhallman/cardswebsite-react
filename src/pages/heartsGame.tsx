import Hand from '../components/Hand'
import CardTable from '../components/CardTable'
import { Suit } from '../components/Card'
import { useEffect, useState, useRef, createContext, Context } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { reindexPlayerArray, parseNameFromPlayerDescriptorString } from '../utils/cardGameUtils';
import { GameContext } from '../context/GameContext';

// This is a hardcoded hand for testing purposes

function HeartsGame() {
    const { gameId } = useParams<{ gameId: string }>();

    const [stompClient, setStompClient] = useState<Client | undefined>(undefined);
    const [fullHand, setFullHand ]= useState<{suit : string, value : string, rank : string}[] >([]);
    const [tableCards, setTableCards ]= useState<Map<string, {suit : string, value : string, rank : string}>>(
        new Map([])
    );
    // TODO: Obviously will remove this hardcoded player name in the future, and get it from the user passed down through context
    const playerName = "user";

    // Player order reflects the respoective positions of players at the table, 
    //  not the current order exactly since it doesnt change with trick wins
    const [playerOrder, setPlayerOrder] = useState<string[] | undefined>(undefined);

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 1000,
            onConnect: () => {
                console.log("STOMP connection established");
                setStompClient(client);

                client.subscribe(`/topic/hearts/game-room/${gameId}`, (message) => {
                    console.log("Received message:", message.body);
                    try {
                        const messageData = JSON.parse(message.body);
                        console.log("Message data:", messageData);

                        // Update player order if it has changed for whatever reason
                        // TODO: server only sending over changed info could prevent some of these checks
                        const newPlayerOrder = messageData.currentGameState.playerDescriptors.map((player: any) => player.name);
                        if (JSON.stringify(playerOrder) !== JSON.stringify(newPlayerOrder)) {
                            setPlayerOrder(messageData.currentGameState.playerDescriptors.map((player: any) => player.name));
                        }         

                        // Update the cards on the table (current trick)
                        // For table cards, index starts at 0 on the top and goes clockwise
                        // We also need to extract the player name from the player descriptor string
                        const currentTrickLocal : Map<string,  {suit : string, value : string, rank : string}> = new Map(
                            Object.entries(messageData.currentGameState.currentTrickMap).map(([key, value]) => [
                                parseNameFromPlayerDescriptorString(key) as string || key as string,
                                value as {suit : string, value : string, rank : string}
                            ])
                        );                        
                        console.log("Current Trick:", currentTrickLocal);
                        setTableCards(currentTrickLocal);

                        // Update the player's hand
                        // TODO: Should sort the cards by suit then value
                        const player = messageData.currentGameState.players.find((player: any) => player.name === playerName);
                        const playerHand : {suit : string, value : string, rank : string}[] = player.hand;
                        console.log("Player hand:", playerHand);
                        if (player) {
                            setFullHand(playerHand);
                        } else {
                            console.error("Player not found in current game state!");
                            return;
                        }
                        // const playerHandLocal : [rank: string, suit: Suit][] = messageData.currentGameState.players

                    } catch (error) {
                        console.error("Error parsing message:", error);
                        return;
                    }

                });

            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
            },
            onWebSocketClose: () => {
                console.log("WebSocket connection closed");
            },
            onWebSocketError: (error) => {
                console.error("WebSocket error:", error);
            }
        });

        client.activate();

        // Cleanup on unmount
        return () => {
            client.deactivate();
        };
    }, [gameId]);

    return (
        <>
            <GameContext.Provider value={{gameWebSocketRoot: `/app/hearts/game-room/${gameId}`, stompClient: stompClient}}>
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