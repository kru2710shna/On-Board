// src/components/BodyPage.js
import React from 'react';
import NavBarWrapper from './NavBarWrapper';
import '../BodyPage.css'; // Optional: For additional styles

const BodyPage = () => {
    return (
        <div className="container-fluid">
            <NavBarWrapper />
            <div className="row" style={{ marginTop: '20px' }}>
                {/* Left Column - Vertical Navbar */}
                <div className="col-3 bg-light" style={{ padding: '20px' }}>
                    <h5>Profile Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href="#profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#events">Events</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#learning">On-Board Learnings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#groups">Groups</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#help">Help</a>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="col-9" style={{ backgroundColor: 'white', padding: '20px' }}>
                    <h2>Job Listings</h2>
                    <div className="job-listings">
                        {/* Job Posting Cards will go here */}
                        <div className="job-card">
                            <h5>Job Title 1</h5>
                            <p>Job Description 1...</p>
                        </div>
                        <div className="job-card">
                            <h5>Job Title 2</h5>
                            <p>Job Description 2...</p>
                        </div>
                        <div className="job-card">
                            <h5>Job Title 3</h5>
                            <p>Job Description 3...</p>
                        </div>
                        {/* Add more job postings as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyPage;
