import Banner from './components/Banner'
import Downloads from './pages/downloads'
import Home from './pages/home'
import HeartsGame from './pages/heartsGame'
import HeartsLobbyJoin from './pages/heartsLobbyJoin'
import HeartsLobby from './pages/heartsLobby'
import GamesList from './pages/gamesList'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Context, createContext } from 'react'

export const GameWebSocketRootContext : Context<string> = createContext(`/hearts/game-room/`);

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/downloads" element={<Downloads/>} />
                <Route path="/heartsLobbyJoin" element={<HeartsLobbyJoin/>} />
                <Route path="/gamesList" element={<GamesList/>} />
                <Route path="/heartsLobby/:gameId" element={<HeartsLobby/>} />
                <Route path="/heartsGame/:gameId" element={<HeartsGame/>} />
            </Routes>
        </Router>
    )
}

export default App;