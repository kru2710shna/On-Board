// src/App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';
import MemberPage from './components/MemberPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import { AuthProvider } from './components/AuthContext';  

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
        localStorage.setItem('darkMode', !isDarkMode); // Save preference
    };

    return (
        <AuthProvider>
            <Router>
                <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <Routes>
                    <Route exact path='/' element={<HomePage isDarkMode={isDarkMode} />} />
                    <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} />} />
                    <Route path="/member/:name" element={<MemberPage isDarkMode={isDarkMode} />} />
                    <Route path="/login" element={<Login isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
                    <Route path="/signup" element={<SignUp isDarkMode={isDarkMode} />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
