import Banner from './components/Banner'
import GamesList from './pages/gamesList'
import HeartsGame from './pages/heartsGame'
import HeartsLobby from './pages/heartsLobby'
import HeartsLobbyJoin from './pages/heartsLobbyJoin'
import Home from './pages/home'
import Login from './pages/login'

import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

import React, { useEffect, useLayoutEffect } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './context/UserContext'
import axios from 'axios'

function App() {
    const [jwtToken, setJwtToken] = React.useState<string | null>(localStorage.getItem('jwtToken'));
    const [username, setUsername] = React.useState<string | null>(localStorage.getItem('username'));

    // Load the token from localStorage when the component mounts
    useEffect(() => {
        if (jwtToken) {
            console.log("Setting token in local storage");
            localStorage.setItem('jwtToken', jwtToken);
        } 

        if (username) {
            console.log("Setting username in local storage");
            localStorage.setItem('username', username);
        } 
    }, [jwtToken, username]);

    useLayoutEffect(() => {
        // TODO: Implement a refresh token strategy
        const refreshInterceptor = axios.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {   
                console.log("Error status: " + error.data);

                if(error.status === 401) {
                    console.log("Token expired, logging out");
                    setJwtToken(null);
                    setUsername(null);
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('username');
                }

                return Promise.reject(error);
            }
        )
    }, []);

    if(!jwtToken || !username) {
        return <Login setToken={setJwtToken} setUser={setUsername} />
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Banner/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/heartsLobbyJoin" element={<HeartsLobbyJoin/>} />
                    <Route path="/gamesList" element={<GamesList/>} />
                    <Route index element={<Home/>} />
                </Route>
                <Route path="/heartsLobby/:gameId" element={
                    <ProtectedRoute allowWhenGameStarted={false}>                   
                         <HeartsLobby/>
                    </ProtectedRoute>
                    }/>
                <Route path="/heartsGame/:gameId" element={
                    <ProtectedRoute allowWhenGameStarted={true}>                   
                        <HeartsGame/>
                    </ProtectedRoute>
               }/>
            </>
        )
    );
    
    return (
        <UserContext.Provider value={{username: username, token: jwtToken}}>
            <RouterProvider router={router} /> 
        </UserContext.Provider>
    )
}

export default App;