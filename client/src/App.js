import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';
import MemberPage from './components/MemberPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import News from './components/News';
import Jobs from './components/Jobs';
import AddJob from './components/AddJob';
import ChatBot from './components/ChatBot';
import Dashboard from './components/Dashboard';
import AuthContext from './context/Auth/authContext';
import AuthState from './context/Auth/AuthState';
import JobState from './context/Jobs/JobsState';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
    };

    return (
        <Router>
            <AuthState>
                <JobState>
                    <div className={isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}>
                        {isLoggedIn && <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
                        <Routes>
                            <Route
                                path="/"
                                element={isLoggedIn ? <Navigate to="/Dashboard" replace /> : <HomePage isDarkMode={isDarkMode} />}
                            />
                            <Route path="/signup" element={<SignUp isDarkMode={isDarkMode} />} />
                            <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
                            <Route path="/logout" element={<Logout isDarkMode={isDarkMode} />} />
                            <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} />} />
                            <Route path="/member/:name" element={<MemberPage isDarkMode={isDarkMode} />} />
                            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" replace />} />
                            <Route path="/jobs" element={<Jobs isDarkMode={isDarkMode} /> }/>
                            <Route path="/addjob" element={<AddJob  isDarkMode={isDarkMode} />} />
                            <Route path="/editprofile" element={ <EditProfile  isDarkMode={isDarkMode} />} />
                            <Route path="/news" element={isLoggedIn ? <News isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                            <Route path="/AddJob" element={isLoggedIn ? <AddJob isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                            <Route path="/ChatBot" element={isLoggedIn ? <ChatBot isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                            <Route path="/Dashboard" element={isLoggedIn ? <Dashboard isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </JobState>
            </AuthState>
        </Router>
    );
}

export default App;