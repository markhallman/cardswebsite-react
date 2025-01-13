import { Context, createContext } from 'react';

interface UserContextType {
    username?: string;
    token?: string;
    // TODO: Add token and other user info here
    // TODO: Would it make sense to have seprate contexts for user vs game info?
}

export const UserContext : Context<UserContextType> = createContext({});