import Banner from './components/Banner'
import Downloads from './pages/downloads'
import Home from './pages/home'
import HeartsGame from './pages/heartsGame'
import HeartsLobbyJoin from './pages/heartsLobbyJoin'
import GamesList from './pages/gamesList'


import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/downloads" element={<Downloads/>} />
                <Route path="/heartsLobbyJoin" element={<HeartsLobbyJoin/>} />
                <Route path="/heartsGame" element={<HeartsGame/>} />
                <Route path="/gamesList" element={<GamesList/>} />
            </Routes>
        </Router>
    )
}

export default App;