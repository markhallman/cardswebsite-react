import { Client, StompSubscription } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Player } from "../components/PlayerDisplay";
import { RulesConfig } from "../components/RulesConfigEditor";
import { ScoreboardObj } from "../pages/heartsGame";
import { parseNameFromPlayerDescriptorString, sortCards } from "./cardGameUtils";

var client : Client | null = null;
var gameSubscription : StompSubscription | null = null;
var lobbySubscription : StompSubscription | null = null;
var startGameListener : StompSubscription | null = null;

const isDevelopment = process.env.NODE_ENV === 'development';
export const apiBaseUrl = isDevelopment ? 'https://localhost:8443' : 'https://coolestcardgames.com:8443';
export const websocketUrl = isDevelopment ? 'wss://localhost:8443/ws' : 'wss://coolestcardgames.com:8443/ws';

const initWebSocket = (token: string | undefined, 
    subscribeAction?: () => void) => {
    return new Promise((resolve, reject) => {
        if (client) {
            subscribeAction?.();
            resolve(client);
            return;
        }

        if (!token) {
            console.error("No token found in user context");
            reject(new Error("No token found in user context"));
            return;
        }

        client = new Client({
            brokerURL: `${websocketUrl}?token=${token}`,
            reconnectDelay: 1000,

            onConnect: () => {
                console.log("STOMP connection established");
                console.log("subscribeAction: ", subscribeAction);  
                if(subscribeAction){
                    console.log("Calling subscribeAction");
                    subscribeAction();
                }

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

const deactivateWebSocket = () => {
    if (client) {
        client.deactivate();
        client = null;
    }
};

const unsubscribeFromConnection = (gameId : string | undefined, subscription : StompSubscription | null) => {
    return new Promise<void>((resolve, reject) => {   
        if (!client) {
            reject(new Error("WebSocket client is not initialized. Call initializeWebSocket first."));
            return;
        }
    
        if (!gameId) {
            reject(new Error("No game ID supplied"));
            return;
        }

        if (!subscription) {
            reject(new Error("No subscription found"));
            return; 
        }

        console.log("Unsubscribing from:", gameId);
        subscription.unsubscribe();
        resolve();
    });
}

// Set the proper websocket subscriptions for the lobby
// TODO: WHAT IS THE ACTUAL TYPE OF RULES CONFIG
export const subscribeToLobby = (gameId : string | undefined, 
    setRulesConfig : React.Dispatch<React.SetStateAction<RulesConfig | undefined>>,
    setPlayerList : React.Dispatch<React.SetStateAction<Player[] | undefined>>,
    setGameOwner : React.Dispatch<React.SetStateAction<string | undefined>>,
    navigate: (path: string) => void) => {

    if (!client) {
        throw new Error("WebSocket client is not initialized. Call initializeWebSocket first.");
    }

    if (!gameId) {
        throw new Error("No game ID supplied");
    }

    console.log("Subscribing to lobby for game:", gameId);
    lobbySubscription = client.subscribe(`/topic/hearts/game-lobby/${gameId}`, (message) => {
        console.log("Received message:", message.body);
        try {
            const messageData = JSON.parse(message.body);
            console.log("Message data:", messageData);

            // Update the rules config if it has changed
            if (messageData.rulesConfig) {
                setRulesConfig(messageData.rulesConfig);
            }

            // Update the player list if it has changed
            if (messageData.players) {
                setPlayerList(messageData.players);
            }

            if (messageData.gameOwner) {
                setGameOwner(messageData.gameOwner.name);
            }

        } catch (error) {
            console.error("Error parsing message:", error);
            throw error;
        }
    });

    startGameListener = client.subscribe(`/topic/hearts/game-lobby/${gameId}/startGame`, (message) => {
        console.log("Received message:", message.body);
        try {
            const messageData = JSON.parse(message.body);
            console.log("Message data:", messageData);

            // If we hear back from the server that the game is starting, go to the game page
            navigate(`/heartsGame/${gameId}`);

        } catch (error) {
            console.error("Error parsing message:", error);
            throw error;
        }
    });


    return client;
}

// TODO: unsubscribe actions should be handled by hook, not on component
export const unsubscribeFromLobby = async (gameId : string | undefined) => {
    // TODO: this is wonky, do we need this
    await unsubscribeFromConnection(gameId, startGameListener);   
    await unsubscribeFromConnection(gameId, lobbySubscription);
}


// Subscribes to the game room for the given game ID
// The state setters are sourced from the game page, maybe could be refactored
export const subscribeToGame = (gameId : string | undefined, 
    playerName : string | undefined,
    setPlayerOrder : React.Dispatch<React.SetStateAction<string[] | undefined>>, 
    setFullHand :  React.Dispatch<React.SetStateAction<{ suit: string, value: string, rank: string }[]>> , 
    setTableCards :  React.Dispatch<React.SetStateAction<Map<string, { suit: string, value: string, rank: string }>>>,
    setScoreboard : React.Dispatch<React.SetStateAction<ScoreboardObj | undefined>>) => {

        if (!client) {
            throw new Error("WebSocket client is not initialized. Call initializeWebSocket first.");
        }
    
        if (!gameId) {
            throw new Error("No game ID supplied");
        }

        if (!playerName) {
            throw new Error("No player name supplied");
        }
    
        console.log("Subscribing to game room:", gameId);
    
        const playerOrder : string[] = [];
        gameSubscription = client.subscribe(`/topic/hearts/game-room/${gameId}`, (message) => {
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
                console.log("Player name:", playerName);
                const player = messageData.currentGameState.players.find((player: any) => player.name === playerName);
                console.log("Player:", player);
                const playerHand : {suit : string, value : string, rank : string}[] = player.hand;
                console.log("Player hand:", playerHand);
                if (player) {
                    setFullHand(sortCards(playerHand));
                } else {
                    console.error("Player not found in current game state!");
                    throw new Error("Player not found in current game state!"); 
                    return;
                }

                // Update the scoreboard
                const playerScores = messageData.currentGameState.scoreBoard.score;
                setScoreboard({playerScores});
    
            } catch (error) {
                console.error("Error parsing message:", error);
                throw error;
            }
        });

        return gameSubscription
}

export const unsubscribeFromGame = (gameId : string | undefined) => {
    unsubscribeFromConnection(gameId, gameSubscription);
}

let activeComponents : number = 0;

// Custom Hook to manage the websocket connection centrally
export function useWebSocket(token : string | undefined, subscribeAction?: () => void) { 
    const [client, setClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const location = useLocation();
    
    useEffect(() => {
        activeComponents++;
        const initWebSocketLocal = async () => {
            try {
                await initWebSocket(token, subscribeAction);
                console.log("WebSocket connection established");
        
                const initializedClient: Client = getWebSocketClient();
                setClient(initializedClient);
                console.log("websocketutil is connected : " + initializedClient.connected);
                setIsConnected(initializedClient.connected);

            } catch (error) {
                console.error("Error initializing websocket:", error);
            }
        }

        if (!token) {
            console.error("No token found in user context");
            return;
        }

        if (!client || !isConnected) {
            console.log("Initializing websocket");
            initWebSocketLocal();
        }

        // We should deactivate the websocket if we arent in the game lobby or game page
        if (!location.pathname.includes('heartsLobby') && !location.pathname.includes('heartsGame')) {
            console.log("Navigation away from game lobby/page detected, deactivating websocket");
            deactivateWebSocket();
            setClient(null);
            setIsConnected(false);
        }

        return () => {
            activeComponents--;
            if (activeComponents === 0 && isConnected) {
                deactivateWebSocket();
                setClient(null);
                setIsConnected(false);
            }
    };

    }, [token, location]);

    return {client, isConnected};
}