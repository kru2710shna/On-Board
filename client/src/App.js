import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';
import MemberPage from './components/MemberPage';
import Login from './components/Login';
import Logout from './components/Logout.js'
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import News from './components/News';
import Jobs from './components/Jobs';
import AddJob from './components/AddJob';
import ChatBot from './components/ChatBot';
import Dashboard from './components/Dashboard';
import AuthContext from './context/Auth/authContext';
import CompanyProfile from './components/Profile_Page_Company.js';
import Group from './components/Groups.js';
import CreateGroup from './components/CreateGroup.js';
import JoinGroup from './components/JoinGroup.js';


function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { type, isLoggedIn } = useContext(AuthContext);

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
            <div className={isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}>
                {isLoggedIn && <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={isLoggedIn ? <Navigate to="/Dashboard" replace /> : <HomePage isDarkMode={isDarkMode} />} />
                    <Route path="/signup" element={<SignUp isDarkMode={isDarkMode} />} />
                    <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
                    <Route path="/logout" element={<Logout isDarkMode={isDarkMode} />} />
                    <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} />} />
                    <Route path="/member/:name" element={<MemberPage isDarkMode={isDarkMode} />} />
                    <Route path="/groups" element={isLoggedIn ? <Group isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />

                    {/* Private Routes */}
                    <Route path="/profile" element={isLoggedIn ? (type === "company" ? <CompanyProfile isDarkMode={isDarkMode} /> : <Profile isDarkMode={isDarkMode} />) : <Navigate to="/" replace />} />
                    <Route path="/groups" element={isLoggedIn ? <Group isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                    <Route path="/jobs" element={isLoggedIn ? <Jobs isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                    <Route path="/addjob" element={isLoggedIn ? <AddJob isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                    <Route path="/editprofile" element={isLoggedIn ? <EditProfile isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                    <Route path="/news" element={isLoggedIn ? <News isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                    <Route path="/ChatBot" element={isLoggedIn ? <ChatBot isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                    <Route path="/Dashboard" element={isLoggedIn ? <Dashboard isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                    <Route path="/CompanyProfile" element={isLoggedIn ? <CompanyProfile isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
                    <Route path="/join-group/:groupId" element={<JoinGroup isDarkMode={isDarkMode} />} />
                    <Route path="/create-group" element={<CreateGroup isDarkMode={isDarkMode} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
