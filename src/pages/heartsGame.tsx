import Hand from '../components/Hand'
import CardTable from '../components/CardTable'
import { Suit } from '../components/Card'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

let playerHand = [["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["4","H"]];

function HeartsGame(){
    // TODO: Obviously these are temporary and should be grabbed from the server
    var fullHand  : [rank: string, suit: Suit][] = [["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["4","H"]];
    var tableCards : [rank: string, suit: Suit][] = [["14","S"],["14","S"],["14","S"],["14","S"]]

    const { gameId } = useParams<{ gameId: string }>();
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/ws`);

        ws.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.onmessage = (event) => {
            console.log("Message from server:", event.data);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        setWebSocket(ws);

        // Cleanup on unmount
        return () => {
            ws.close();
        };
    }, [gameId]);

    function onUserCardClick() {
        console.log("User card clicked");
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