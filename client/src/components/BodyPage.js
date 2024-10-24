// src/components/BodyPage.js
import React from 'react';
import '../BodyPage.css'; // Optional: For additional styles

const BodyPage = ({ isDarkMode }) => {
    return (
        <div className={`container-fluid ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <div className="row" style={{ marginTop: '20px' }}>
                {/* Left Column */}
                <div className={`col-3 ${isDarkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`} style={{ padding: '20px' }}>
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

                {/* Mid Column - Job Listings */}
                <div className={`col-6 ${isDarkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`} style={{ padding: '20px' }}>
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

                {/* Right Column - Popular Open-Workspace Groups */}
                <div className={`col-3 ${isDarkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`} style={{ padding: '20px' }}>
                    <h5>Popular Open-Workspace Groups</h5>
                    <div className="group-list">
                        {/* Group Cards will go here */}
                        <div className="group-card">
                            <h6>Group Name 1</h6>
                            <p>Brief description of group 1...</p>
                        </div>
                        <div className="group-card">
                            <h6>Group Name 2</h6>
                            <p>Brief description of group 2...</p>
                        </div>
                        <div className="group-card">
                            <h6>Group Name 3</h6>
                            <p>Brief description of group 3...</p>
                        </div>
                        {/* Add more groups as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyPage;
