import Hand from '../components/Hand'
import CardTable from '../components/CardTable'
import { Suit } from '../components/Card'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// This is a hardcoded hand for testing purposes
let playerHand : [rank: string, suit: Suit][] = [["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["4","H"]];

function HeartsGame(){
    const { gameId } = useParams<{ gameId: string }>();
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [fullHand, setFullHand ]= useState<[rank: string, suit: Suit][] >(playerHand);
    const [tableCards, setTableCards ]= useState<[rank: string, suit: Suit][] >([]);

    useEffect(() => {
        let ws: WebSocket
        let retryCount = 0;
        const maxRetries = 5;

        const connectWebSocket = () => {
            ws = new WebSocket(`ws://localhost:8080/ws`);

            ws.onopen = () => {
                console.log("WebSocket connection established");
                setWebSocket(ws);
            };

            ws.onmessage = (event) => {
                console.log("Message from server:", event.data);
            };

            ws.onclose = () => {
                console.log("WebSocket connection closed");
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`Retrying connection (${retryCount}/${maxRetries})...`);
                    setTimeout(connectWebSocket, 1000); // Retry after 1 second
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
        };

        connectWebSocket();

        // Cleanup on unmount
        return () => {
            ws.close();
        };
        
    }, [gameId]);

    function onUserCardClick() {
        if (webSocket?.readyState !== WebSocket.OPEN) {
            console.error("WebSocket connection is not open");
            return;
        }
        webSocket?.send("Card Clicked");
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