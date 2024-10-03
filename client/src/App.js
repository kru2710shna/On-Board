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
import BodyPage from './components/BodyPage'; // Import BodyPage
import { AuthProvider } from './components/AuthContext';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
        localStorage.setItem('darkMode', !isDarkMode);
    };

    useEffect(() => {
        const loggedIn = localStorage.getItem('isAuthenticated');
        if (loggedIn) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthProvider>
            <Router>
                {isAuthenticated && <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}

                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    {/* Add BodyPage route */}
                    {isAuthenticated && <Route path="/body" element={<BodyPage />} />}
                    {isAuthenticated && (
                        <>
                            <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} />} />
                            <Route path="/member/:name" element={<MemberPage isDarkMode={isDarkMode} />} />
                            <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
                        </>
                    )}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
