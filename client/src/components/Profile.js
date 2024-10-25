import React from 'react';
import { useNavigate } from 'react-router-dom';  // Use navigate here

const Profile = ({ user }) => {
    const navigate = useNavigate();  // Initialize navigate

    return (
        <div>
            <div className="container my-4">
                {/* Section 1: Profile */}
                <div className="section">
                    <h2>Profile</h2>
                    <div>
                        <strong>Name:</strong> {user.name}
                    </div>
                    <div className="profile-photo">
                        <img src={user.photoUrl} alt="Profile" style={{ width: '150px', borderRadius: '50%' }} />
                    </div>
                    <div>
                        <strong>Bio:</strong> {user.bio}
                    </div>
                    <div className="skills">
                        {user.skills.map((skill, index) => (
                            <span key={index} className="badge bg-primary mx-1">{skill}</span>
                        ))}
                    </div>
                </div>

                <hr />

                {/* Section 2: Job Break */}
                <div className="section">
                    <h2>Job Break</h2>
                    <div className="d-flex justify-content-between">
                        <div className="job-section" onClick={() => window.location.href = '/userjobs'}>
                            <h4>Jobs</h4>
                            <p>{user.appliedJobs.length} Jobs Applied</p>
                        </div>
                        <div className="job-section" onClick={() => window.location.href = '/userjobs'}>
                            <h4>Saved Jobs</h4>
                            <p>{user.savedJobs.length} Jobs Saved</p>
                        </div>
                        <div className="job-section" onClick={() => window.location.href = '/userjobs'}>
                            <h4>Saved Events</h4>
                            <p>{user.savedEvents.length} Events Bookmarked</p>
                        </div>
                    </div>
                </div>

                <hr />

                {/* Section 3: Education */}
                <div className="section">
                    <h2>Education</h2>
                    {user.education.map((edu, index) => (
                        <div key={index}>
                            <h5>{edu.degree} in {edu.field}</h5>
                            <p>{edu.institution} ({edu.startYear} - {edu.endYear})</p>
                            
                            {/* Display Classes */}
                            {edu.classes && edu.classes.length > 0 && (
                                <div className="classes">
                                    <h6>Classes:</h6>
                                    {edu.classes.map((classItem, classIndex) => (
                                        <div key={classIndex}>
                                            <strong>Class Name:</strong> {classItem.className} <br />
                                            <strong>Description:</strong> {classItem.classDescription} <br />
                                            {classItem.classGitHubUrl && (
                                                <div>
                                                    <strong>GitHub URL:</strong> <a href={classItem.classGitHubUrl} target="_blank" rel="noopener noreferrer">{classItem.classGitHubUrl}</a>
                                                </div>
                                            )}
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <hr />

                {/* Section 4: Experience */}
                <div className="section">
                    <h2>Experience</h2>
                    {user.experience.map((exp, index) => (
                        <div key={index}>
                            <h5>{exp.position} at {exp.company}</h5>
                            <p>{exp.startYear} - {exp.endYear}</p>
                            <p>Highlights: {exp.highlights.join(', ')}</p>
                        </div>
                    ))}
                </div>

                {/* Edit Profile Button */}
                <button className="btn btn-primary" onClick={() => navigate('/edit-profile')}>Edit Profile</button>  {/* Use navigate here */}
            </div>
        </div>
    );
};

export default Profile;
