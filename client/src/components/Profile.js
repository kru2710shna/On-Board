import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, fetchJobs, fetchGroups } from '../utils/userService.js';
import Section from '../components/Section.js';
import RelatedSection from '../components/RelatedSection.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
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

                const jobsData = await fetchJobs();
                setJobs(jobsData.appliedJobs || []);

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
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center mt-4" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h1>{user?.name}'s Profile</h1>
                </div>
                <div className="card-body">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Type:</strong> {user.type}</p>
                    <p><strong>Premium User:</strong> {user.isPremiumUser ? 'Yes' : 'No'}</p>
                    <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>

                    {/* Sections for experience, education, etc. */}
                    <Section title="Experience" data={user.experience} fields={['company', 'position', 'startDate', 'endDate', 'description']} />
                    <Section title="Education" data={user.education} fields={['institution', 'degree', 'fieldOfStudy', 'startDate', 'endDate']} />
                    <Section title="Classes" data={user.classes} fields={['title', 'description', 'startDate', 'endDate']} />
                    <Section title="Certifications" data={user.certifications} fields={['title', 'issuedBy', 'issueDate', 'expirationDate']} />
                    <Section title="Awards" data={user.awards} fields={['title', 'issuedBy', 'dateReceived', 'description']} />
                    <Section title="Recommendations" data={user.recommendations} fields={['recommenderName', 'position', 'relationship', 'message', 'dateGiven']} />

                    {/* Related sections */}
                    <RelatedSection title="Groups" data={groups} refKey="groupName" />
                    <RelatedSection title="Jobs" data={jobs} refKey="jobTitle" />

                    <button
                        className="btn btn-outline-primary mt-4"
                        onClick={() => navigate('/editprofile')}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
