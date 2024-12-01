import React, { useState } from 'react';
import { updateProfile } from '../utils/userService.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../EditProfile.css'; 

const EditProfile = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        bio: '',
        experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
        education: [{ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
        classes: [{ title: '', description: '', startDate: '', endDate: '' }],
        certifications: [{ title: '', issuedBy: '', issueDate: '', expirationDate: '' }],
        awards: [{ title: '', issuedBy: '', dateReceived: '', description: '' }],
        recommendations: [{ recommenderName: '', position: '', relationship: '', message: '', dateGiven: '' }],
        groups: '',
        jobs: '',
    });

    const [message, setMessage] = useState(null);

    const handleChange = (e, section, index, field) => {
        const { value } = e.target;
        const updatedDetails = [...userDetails[section]];
        updatedDetails[index][field] = value;
        setUserDetails({ ...userDetails, [section]: updatedDetails });
    };

    const handleAddSection = (section) => {
        const newSection = { ...userDetails[section][0] }; // Copy structure of first item in section
        setUserDetails({ ...userDetails, [section]: [...userDetails[section], newSection] });
    };

    const handleRemoveSection = (section, index) => {
        const updatedDetails = [...userDetails[section]];
        updatedDetails.splice(index, 1);
        setUserDetails({ ...userDetails, [section]: updatedDetails });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(userDetails);
            setMessage('Profile updated successfully');
            setTimeout(() => navigate('/profile'), 2000); // Navigate after 2 seconds
        } catch (error) {
            setMessage('Error updating profile');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h1>Edit Profile</h1>
                    <p className="small text-light">Fill out the form to update your profile</p>
                </div>
                <div className="card-body">
                    {message && (
                        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        {/* Name and Email fields */}
                        {[
                            { label: 'Name', name: 'name', type: 'text', hint: 'Enter your full name.' },
                            { label: 'Email', name: 'email', type: 'email', hint: 'Enter your primary email address.' },
                            { label: 'Bio', name: 'bio', type: 'textarea', hint: 'Write a short biography about yourself.' }
                        ].map((field, index) => (
                            <div className="mb-4" key={index}>
                                <label className="form-label">
                                    {field.label}:
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            className="form-control"
                                            name={field.name}
                                            rows="3"
                                            value={userDetails[field.name]}
                                            onChange={(e) => handleChange(e, field.name)}
                                        ></textarea>
                                    ) : (
                                        <input
                                            type={field.type}
                                            className="form-control"
                                            name={field.name}
                                            value={userDetails[field.name]}
                                            onChange={(e) => handleChange(e, field.name)}
                                        />
                                    )}
                                </label>
                                <div className="hint mt-1">
                                    <small className="text-muted">{field.hint}</small>
                                </div>
                            </div>
                        ))}

                        {/* Experience, Education, Classes, Certifications, Awards, Recommendations sections */}
                        {['experience', 'education', 'classes', 'certifications', 'awards', 'recommendations'].map((section, index) => (
                            <div key={index}>
                                <h5 className="mt-4">{section.charAt(0).toUpperCase() + section.slice(1)}</h5>
                                {userDetails[section].map((item, itemIndex) => (
                                    <div className="border p-3 mb-4" key={itemIndex}>
                                        {Object.keys(item).map((field, fieldIndex) => (
                                            <div className="mb-3" key={fieldIndex}>
                                                <label className="form-label">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name={field}
                                                    value={item[field]}
                                                    onChange={(e) => handleChange(e, section, itemIndex, field)}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveSection(section, itemIndex)}
                                        >
                                            Remove {section.slice(0, -1)} Item
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => handleAddSection(section)}
                                >
                                    Add New {section.slice(0, -1)} Item
                                </button>
                            </div>
                        ))}

                        <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
