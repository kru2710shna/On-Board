import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../utils/userService.js'

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getProfile(); 
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={() => navigate('/editprofile')}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
