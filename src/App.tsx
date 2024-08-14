import Banner from './components/Banner'
import Downloads from './pages/downloads'
import Home from './pages/home'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/downloads" element={<Downloads/>} />
            </Routes>
        </Router>
    )
}

export default App;