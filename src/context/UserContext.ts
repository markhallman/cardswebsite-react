import { Context, createContext } from 'react';

interface UserContextType {
    username?: string,
}

export const UserContext : Context<UserContextType> 
         = createContext<UserContextType>({});