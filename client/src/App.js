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
import EditProfile from './components/EditProfile';
import News from './components/News';
import Jobs from './components/Jobs';
import JobState from './context/Jobs/JobsState';
import AddJob from './components/AddJob'



function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [user, setUser] = useState({
        name: "Krushna Thakkar",
        photoUrl: "https://via.placeholder.com/150",
        bio: "Aspiring software engineer...",
        skills: ["Python", "JavaScript", "React", "Machine Learning"],
        appliedJobs: [1, 2, 3],
        savedJobs: [1, 2],
        savedEvents: [1],
        education: [
            { degree: "Bachelor of Science", field: "Computer Science", institution: "San Francisco State University", startYear: 2020, endYear: 2024 }
        ],
        experience: [
            { position: "Machine Learning Engineer Intern", company: "Good Work Hub", startYear: 2023, endYear: 2024, highlights: ["Developed ML models", "Improved accuracy by 20%"] }
        ]
    });

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

    const handleProfileSave = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <JobState>
            <div className={isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}>
                <Router>
                    <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                    <Routes>
                        <Route exact path='/' element={<HomePage isDarkMode={isDarkMode} />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/body" element={<BodyPage isDarkMode={isDarkMode} />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/member/:name" element={<MemberPage />} />
                        <Route path="/profile" element={<Profile user={user} onEdit={() => { }} />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/edit-profile" element={<EditProfile user={user} onSave={handleProfileSave} />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/news" element={<News isDarkMode={isDarkMode} />} />
                        <Route path="/AddJob" element={<AddJob />} />
                    </Routes>
                </Router>
            </div>
        </JobState>
    );
}

export default App;
