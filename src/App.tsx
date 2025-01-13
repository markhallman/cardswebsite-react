import Banner from './components/Banner'
import Downloads from './pages/downloads'
import GamesList from './pages/gamesList'
import HeartsGame from './pages/heartsGame'
import HeartsLobby from './pages/heartsLobby'
import HeartsLobbyJoin from './pages/heartsLobbyJoin'
import Home from './pages/home'
import Login from './pages/login'

import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './context/UserContext'

function App() {
    // TODO: Might want to just use a single state object for user info, can extract username from token
    const [jwtToken, setJwtToken] = React.useState<string | null>(localStorage.getItem('jwtToken'));
    const [username, setUsername] = React.useState<string | null>(localStorage.getItem('username'));

    // Load the token from localStorage when the component mounts
    // TODO: This is a security vulnerability. We should use a secure cookie instead.
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

    if(!jwtToken || !username) {
        return <Login setToken={setJwtToken} setUser={setUsername} />
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Banner/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/downloads" element={<Downloads/>} />
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