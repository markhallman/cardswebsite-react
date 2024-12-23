import { Client } from '@stomp/stompjs'
import { Context, createContext } from 'react'

interface UserContextType {
    username: string;
    gameWebSocketRoot: string;
    stompClient?: Client; 
    // TODO: Add token and other user info here
    // TODO: Would it make sense to have seprate contexts for user vs game info?
}

export const UserContext : Context<UserContextType> = createContext({username: "user", gameWebSocketRoot: "/topic/game-room"});