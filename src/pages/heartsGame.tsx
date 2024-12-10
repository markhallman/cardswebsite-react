import Hand from '../components/Hand'
import CardTable from '../components/CardTable'
import { Suit } from '../components/Card'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';

// This is a hardcoded hand for testing purposes
let playerHand : [rank: string, suit: Suit][] = [["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["4","H"]];

function HeartsGame(){
    const { gameId } = useParams<{ gameId: string }>();
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [fullHand, setFullHand ]= useState<[rank: string, suit: Suit][] >(playerHand);
    const [tableCards, setTableCards ]= useState<[rank: string, suit: Suit][] >([]);

    useEffect(() => {
        let client: Client
        let retryCount = 0;
        const maxRetries = 5;

        const connectStompClient = () => {
            client = new Client({
                brokerURL: 'ws://localhost:8080/ws',
                reconnectDelay: 1000,
                onConnect: () => {
                    console.log("STOMP connection established");
                    setStompClient(client);
                },
                onStompError: (frame) => {
                    console.error("STOMP error:", frame);
                },
                onWebSocketClose: () => {
                    console.log("WebSocket connection closed");
                    if (retryCount < maxRetries) {
                        retryCount++;
                        console.log(`Retrying connection (${retryCount}/${maxRetries})...`);
                        setTimeout(connectStompClient, 1000); // Retry after 1 second
                    }
                },
                onWebSocketError: (error) => {
                    console.error("WebSocket error:", error);
                }
            });

            client.activate();
        };


        connectStompClient();

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
                        <CardTable cards={tableCards}  />
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