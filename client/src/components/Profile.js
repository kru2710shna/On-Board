import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, fetchJobs, fetchGroups } from '../utils/userService.js';
import Section from '../components/Section.js';
import RelatedSection from '../components/RelatedSection.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = ({ isDarkMode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userData = await getProfile();
                setUser(userData);

                const groupsData = await fetchGroups();
                setGroups(groupsData || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return (
            <div className={`d-flex justify-content-center align-items-center vh-100 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`container text-center mt-5 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <div className="alert alert-danger shadow-lg" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i> {error}
                </div>
            </div>
        );
    }

    return (
        <div className={`container mt-5 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <div className="card shadow-lg">
                <div
                    className={`card-header text-center py-5 ${isDarkMode ? 'bg-primary text-white' : 'text-white'}`}
                    style={{
                        backgroundImage: isDarkMode
                            ? 'linear-gradient(to right, #343a40, #6c757d)'
                            : 'linear-gradient(to right, #007bff, #6610f2)',
                    }}
                >
                    <h1 className="display-5">{user?.name}'s Profile</h1>
                    <p className="lead mt-2">
                        {user.bio || 'Welcome to my profile!'}{' '}
                        <span className={`badge ${user.isPremiumUser ? 'bg-success' : 'bg-secondary'} ms-2`}>
                            {user.isPremiumUser ? 'Premium User' : 'Standard User'}
                        </span>
                    </p>
                </div>
                <div className={`card-body ${isDarkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`}>
                    <div className="row mb-4">
                        <div className="col-md-4 text-center">
                            <img
                                src={user.profilePicture || '/default-avatar.png'}
                                alt={`${user.name}'s Avatar`}
                                className="rounded-circle shadow"
                                width="150"
                                height="150"
                            />
                        </div>
                        <div className="col-md-8">
                            <h3>About Me</h3>
                            <p>
                                <strong>Name:</strong> {user.name}
                            </p>
                            <p>
                                <strong>Contact:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Type:</strong> {user.type}
                            </p>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="row">
                        <div className="col-md-12">
                            <Section
                                title="Experience"
                                data={user.experience}
                                fields={['company', 'position', 'startDate', 'endDate', 'description']}
                            />
                            <Section
                                title="Education"
                                data={user.education}
                                fields={['institution', 'degree', 'fieldOfStudy', 'startDate', 'endDate']}
                            />
                            <Section
                                title="Classes"
                                data={user.classes}
                                fields={['title', 'description', 'startDate', 'endDate']}
                            />
                            <Section
                                title="Certifications"
                                data={user.certifications}
                                fields={['title', 'issuedBy', 'issueDate', 'expirationDate']}
                            />
                            <Section
                                title="Awards"
                                data={user.awards}
                                fields={['title', 'issuedBy', 'dateReceived', 'description']}
                            />
                            <Section
                                title="Recommendations"
                                data={user.recommendations}
                                fields={['recommenderName', 'position', 'relationship', 'message', 'dateGiven']}
                            />
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="row">
                        <div className="col-md-6">
                            <RelatedSection title="Groups" data={groups} refKey="groupName" />
                        </div>
                        <div className="col-md-6">
                            <RelatedSection title="Jobs" data={jobs} refKey="jobTitle" />
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <button
                            className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-primary'} btn-lg shadow-sm`}
                            onClick={() => navigate('/editprofile')}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
