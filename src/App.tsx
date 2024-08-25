import Banner from './components/Banner'
import Downloads from './pages/downloads'
import Home from './pages/home'
import HeartsGame from './pages/heartsGame'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/downloads" element={<Downloads/>} />
                <Route path="/heartsGame" element={<HeartsGame/>} />
            </Routes>
        </Router>
    )
}

export default App;