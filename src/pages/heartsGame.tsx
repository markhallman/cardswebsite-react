import Hand from '../components/Hand'
import CardTable from '../components/CardTable'
import { Suit } from '../components/Card'
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { reindexPlayerArray } from '../utils/cardGameUtils';

// This is a hardcoded hand for testing purposes
let playerHand : [rank: string, suit: Suit][] = [["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["4","H"]];

function HeartsGame() {
    const { gameId } = useParams<{ gameId: string }>();
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [fullHand, setFullHand ]= useState<[rank: string, suit: Suit][] >(playerHand);
    const [tableCards, setTableCards ]= useState<[rank: string, suit: Suit][] >([]);
    // TODO: Remove for testing, need to pass this downstream to all components with that react thingy
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

                        // Update player order if it has 
                        // TODO: server only sending over changed info could prevent some of these checks
                        const newPlayerOrder = messageData.currentGameState.playerDescriptors.map((player: any) => player.name);
                        if (JSON.stringify(playerOrder) !== JSON.stringify(newPlayerOrder)) {
                            setPlayerOrder(messageData.currentGameState.playerDescriptors.map((player: any) => player.name));
                        }         

                        // For table cards, index starts at 0 on the top and goes clockwise
                        console.log("Current Trick:", messageData.currentGameState.currentTrickMap);

                        //setTableCards(messageData.currentGameState.currentTrick);


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

    function onUserCardClick() {
        if (!stompClient || !stompClient.connected) {
            console.error("WebSocket connection is not open");
            return;
        }
        console.log("User card clicked");
        //stompClient.publish({ destination: '/app/card-clicked', body: 'Card Clicked' });
    }

    return (
        <>
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
                        <CardTable cards={tableCards}  playerConfiguration={reindexPlayerArray(playerName, playerOrder)}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col fixed-bottom bottomHand offset-4">
                        <Hand cards={fullHand} location="Bottom" isPlayer={true} onClick={onUserCardClick}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeartsGame;