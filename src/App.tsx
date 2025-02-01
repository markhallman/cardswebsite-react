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

function App() {
    const [username, setUsername] = React.useState<string | null>(null);

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const response = await axios.get(`${apiBaseUrl}/authenticated`, {
                    withCredentials: true,
                });
                if(response.data.username == username) {
                    console.log("Username matches")
                    return true;
                } else {
                    console.log("Username missing")
                    setUsername(null);
                    return false;
                }
            } catch (error) {
                setUsername(null);
                return false;
            }
        }

        checkAuthStatus();

    }, [username]);

    if(!username) {
        return <Login setUser={setUsername} />
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
        <UserContext.Provider value={{username: username}}>
            <RouterProvider router={router} /> 
        </UserContext.Provider>
    )
}

export default App;