import Banner from './components/Banner'
import Downloads from './pages/downloads'
import Home from './pages/home'
import HeartsGame from './pages/heartsGame'
import HeartsLobbyJoin from './pages/heartsLobbyJoin'
import HeartsLobby from './pages/heartsLobby'
import GamesList from './pages/gamesList'
import Login from './pages/login'

import { BrowserRouter } from "react-router-dom";

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import { UserContext } from './context/UserContext'

function App() {
    const [jwtToken, setJwtToken] = React.useState<string | null>(null);
    const [username, setUsername] = React.useState<string>("anonymous");
    if(!jwtToken) {
        return <Login setToken={setJwtToken} />
    }
    
    return (
        <UserContext.Provider value={{username: username, token: jwtToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/downloads" element={<Downloads/>} />
                    <Route path="/heartsLobbyJoin" element={<HeartsLobbyJoin/>} />
                    <Route path="/gamesList" element={<GamesList/>} />
                    <Route path="/heartsLobby/:gameId" element={<HeartsLobby/>} />
                    <Route path="/heartsGame/:gameId" element={<HeartsGame/>} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;