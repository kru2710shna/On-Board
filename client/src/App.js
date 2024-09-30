import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';
import MemberPage from './components/MemberPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import { AuthProvider, useAuth } from './components/AuthContext';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
        localStorage.setItem('darkMode', !isDarkMode); // Save preference
    };

    // Check if the user is authenticated when the component mounts
    useEffect(() => {
        // Here you can add logic to check if the user is logged in, e.g., check local storage or make an API call
        const loggedIn = localStorage.getItem('isAuthenticated');
        if (loggedIn) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthProvider>
            <Router>
                {/* Conditionally render NavBar only when user is authenticated */}
                {isAuthenticated && <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}

                <Routes>
                    {/* Render HomePage first */}
                    <Route exact path='/' element={<HomePage />} />

                    {/* Render SignUp and Login pages */}
                    <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

                    {/* Render other pages after login */}
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
