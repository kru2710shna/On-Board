import React, { useState } from 'react';
import { updateProfile } from '../utils/userService.js'; // Import API method
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {
    const [userDetails, setUserDetails] = useState(
        {
            name: '',
            email: '',
            bio: '',
            Education : '',
            Classes : '',
            Certifications : '',
            Awards : '',
            Recommendations : '',
            Groups: '',
            Jobs:''
        });
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
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h1>Edit Profile</h1>
                </div>
                <div className="card-body">
                    {message && (
                        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Name:
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={userDetails.name}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Email:
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={userDetails.email}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Bio:
                                <textarea
                                    className="form-control"
                                    name="bio"
                                    rows="3"
                                    value={userDetails.bio}
                                    onChange={handleChange}
                                ></textarea>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
