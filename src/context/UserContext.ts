import { Context, createContext } from 'react';

interface UserContextType {
    username?: string,
    inGame : boolean,
    inLobby : boolean;
}

export const UserContext : Context<UserContextType> 
         = createContext<UserContextType>({inGame: false, inLobby: false});