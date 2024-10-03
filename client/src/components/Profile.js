// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Profile = () => {
    const { user } = useAuth(); // Assuming user details are stored in AuthContext
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // Fetch user profile data from API or use data from AuthContext
        if (user) {
            setProfileData(user); // If using AuthContext, replace with fetch logic if needed
        }
    }, [user]);

    return (
        <div className="container mt-4">
            <h2>User Profile</h2>
            {profileData ? (
                <div>
                    <p><strong>Username:</strong> {profileData.username}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    {/* Add more fields as needed */}
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
