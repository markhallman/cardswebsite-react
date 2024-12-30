import { Client } from '@stomp/stompjs'
import { Context, createContext } from 'react'

interface GameContextType {
    gameWebSocketRoot: string;
    stompClient?: Client; 
    // TODO: Add token and other user info here
    // TODO: Would it make sense to have seprate contexts for user vs game info?
}

export const GameContext : Context<GameContextType> = createContext({gameWebSocketRoot: "/topic/game-room"}); 