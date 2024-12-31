import { Client } from "@stomp/stompjs";
import { parseNameFromPlayerDescriptorString, sortCards } from "./cardGameUtils";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

var client : Client | null = null;

const initWebSocket = (token: string | null) => {
    return new Promise((resolve, reject) => {
        if (client && client.connected) {
            resolve(client);
            return;
        }

        if (!token) {
            console.error("No token found in user context");
            reject(new Error("No token found in user context"));
            return;
        }

        client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 1000,
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                console.log("STOMP connection established");
                resolve(client);
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
                reject(new Error(`STOMP error: ${frame}`));
            },
            onWebSocketClose: () => {
                console.log("WebSocket connection closed");
            },
            onWebSocketError: (error) => {
                console.error("WebSocket error:", error);
                reject(new Error(`WebSocket error: ${error}`));
            }
        });
    
        client.activate();
    });
 }

const getWebSocketClient = () => {
    if (!client) {
        throw new Error("WebSocket client is not initialized. Call initWebSocket first.");
    }
    return client;
}

export const deactivateWebSocket = () => {
    if (client) {
        client.deactivate();
        client = null;
    }
};

// Set the proper websocket subscriptions for the lobby
// TODO: Implement this function
export const subscribeToLobby = (token: string | null) => {
    if (!token) {
        console.error("No token found in user context");
        return;
    }

    return client;
}

// Subscribes to the game room for the given game ID
// The state setters are sourced from the game page, maybe could be refactored
export const subscribeToGame = (gameId : string | undefined, 
    playerName : string,
    setPlayerOrder : React.Dispatch<React.SetStateAction<string[] | undefined>>, 
    setFullHand :  React.Dispatch<React.SetStateAction<{ suit: string, value: string, rank: string }[]>> , 
    setTableCards :  React.Dispatch<React.SetStateAction<Map<string, { suit: string, value: string, rank: string }>>>) => {
    if (!client) {
        throw new Error("WebSocket client is not initialized. Call initializeWebSocket first.");
    }

    if (!gameId) {
        console.error("No game ID supplied");
        return
    }

    const playerOrder : string[] = [];

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
            console.log("Player name:", playerName);
            const player = messageData.currentGameState.players.find((player: any) => player.name === playerName);
            console.log("Player:", player);
            const playerHand : {suit : string, value : string, rank : string}[] = player.hand;
            console.log("Player hand:", playerHand);
            if (player) {
                setFullHand(sortCards(playerHand));
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
}

export function useWebSocket(token : string | undefined) { 
    const [client, setClient] = useState<Client | null>(null);
    const location = useLocation();
    
    useEffect(() => {
        if (!token) {
            console.error("No token found in user context");
            return;
        }


        if (!client) {
            console.log("Initializing websocket");
            initWebSocket(token).then(() => {
                console.log("WebSocket connection established");
    
                const initializedClient: Client = getWebSocketClient();
                setClient(initializedClient);
            }).catch((error) => {   
                console.error("Error initializing websocket:", error);
            });
        }

        // We should deactivate the websocket if we arent in the game lobby or game page
        const handleNavigation = (location: any) => {
            if (!location.pathname.includes('heartsLobby') && !location.pathname.includes('heartsGame')) {
                console.log("Navigation away from game lobby/page detected, deactivating websocket");
                deactivateWebSocket();
                setClient(null);
            }
        };

        handleNavigation(location);

        return () => {
            handleNavigation(location);
            setClient(null);
    };

    }, [token, location]);

    return client;
}