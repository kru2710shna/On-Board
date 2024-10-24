// src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';
import MemberPage from './components/MemberPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import BodyPage from './components/BodyPage';
import Profile from './components/Profile';
import News from './components/News';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load the user's preference from localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode); 

        const iframe = document.getElementById('news-iframe'); 
        if (iframe) {
            iframe.contentWindow.postMessage({ darkMode: newMode }, '*');
        }
    };

    return (
        <Router>
            <div className={isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}>
                <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <Routes>
                    <Route exact path='/' element={<HomePage isDarkMode={isDarkMode} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/body" element={<BodyPage isDarkMode={isDarkMode} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/member/:name" element={<MemberPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/news" element={<News isDarkMode={isDarkMode} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
