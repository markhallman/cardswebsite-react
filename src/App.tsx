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
import { apiBaseUrl } from './utils/webSocketUtil'
import Register from './pages/register'

function App() {
    const [username, setUsername] = React.useState<string | undefined>(undefined);

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const response = await axios.get(`${apiBaseUrl}/authenticated`, {
                    withCredentials: true,
                });
                console.log("Auth uname ", response.data.username);
                console.log("curr uname ", username);
                if(response.data.username == username || username == null) {
                    setUsername(response.data.username);
                    return true;
                } else {
                    console.log("Username does not match, setting to null")
                    setUsername(undefined);
                    return false;
                }
            } catch (error) {
                setUsername(undefined);
                return false;
            }
        }

        checkAuthStatus();

    }, []);

    // TODO: Add a 404 page
    // TODO: Route to 404 page if game does not exist
    // TODO: Route to 404 page if game is not started
    // TODO: Route to home if user accesses login page and is already logged in. Or at least prefill username?

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Banner setUser={setUsername}/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/heartsLobbyJoin" element={<HeartsLobbyJoin/>} />
                    <Route index element={<Home/>} />
                </Route>
                <Route path="/login" element={<Login setUser={setUsername}/>} />
                <Route path="/register" element={<Register setUser={setUsername}/>} />
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
        <UserContext.Provider value={{username: username}}>
            <RouterProvider router={router} /> 
        </UserContext.Provider>
    )
}

export default App;