import Banner from './components/Banner'
import Downloads from './pages/downloads'
import Home from './pages/home'
import HeartsGame from './pages/heartsGame'
import HeartsLobbyJoin from './pages/heartsLobbyJoin'
import HeartsLobby from './pages/heartsLobby'
import GamesList from './pages/gamesList'
import Login from './pages/login'

import { BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import React, { useEffect } from 'react'
import { UserContext } from './context/UserContext'
import axios from 'axios'

function App() {
    const [jwtToken, setJwtToken] = React.useState<string | null>(null);
    const [username, setUsername] = React.useState<string>("anonymous");

    // Load the token from localStorage when the component mounts
    // TODO: This is a security vulnerability. We should use a secure cookie instead.
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const username = localStorage.getItem('username');
        console.log("token: " + token);
        console.log("username: " + username);

        if (token) {
            setJwtToken(token);
            setUsername(username || "anonymous");
        }

        if (jwtToken) {
            localStorage.setItem('jwtToken', jwtToken);
        } else {
            localStorage.removeItem('jwtToken');
        }

        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }, [jwtToken, username]);

    if(!jwtToken || username == "anonymous") {
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
                <Route 
                    path="/heartsLobby/:gameId"/>
                <Route path="/heartsGame/:gameId" element={<HeartsGame/>} />
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