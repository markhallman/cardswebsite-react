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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/downloads" element={<Downloads/>} />
                <Route path="/heartsLobbyJoin" element={<HeartsLobbyJoin/>} />
                <Route path="/gamesList" element={<GamesList/>} />
                <Route path="/heartsLobby/:gameId" element={<HeartsLobby/>} />
                <Route path="/heartsGame/:gameId" element={<HeartsGame/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;