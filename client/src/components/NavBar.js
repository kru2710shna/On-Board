// src/components/NavBar.js
import members from './MemberData';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../navbar.css';

const NavBar = ({ isLoggedIn, handleLogout }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    return (
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">On-Board</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                About Team
                            </a>
                            <ul className="dropdown-menu">
                                {Object.entries(members).map(([key, member]) => (
                                    <li key={key}>
                                        <Link className="dropdown-item" to={`/member/${key}`}>
                                            {member.fullName || member.Name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="darkModeSwitch" checked={darkMode} onChange={toggleDarkMode} />
                        <label className="form-check-label ms-1 me-3" htmlFor="darkModeSwitch">{darkMode ? 'Light Mode' : 'Dark Mode'}</label>
                    </div>
                    {!isLoggedIn ? (
                        <>
                            {/* <li className="nav-item">
                                <Link className="nav-link active" to="/signup">SignUp</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link active" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/login">Login</Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link active" to="/logout" onClick={handleLogout}>Logout</Link>
                        </li>
                    )}
                </div>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default NavBar;
