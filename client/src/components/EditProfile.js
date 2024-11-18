import React, { useState } from 'react';
import { updateProfile } from '../utils/userService.js'// Import API method

const EditProfile = () => {
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProfile(userDetails); 
            setMessage('Profile updated successfully');
        } catch (error) {
            setMessage('Error updating profile');
        }
    };

    return (
        <div>
            <h1>Edit Profile</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={userDetails.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProfile;
