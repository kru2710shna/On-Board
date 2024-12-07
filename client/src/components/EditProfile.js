import React, { useState, useEffect } from 'react';
import { updateProfile } from '../utils/userService.js';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../EditProfile.css';
import { getProfile} from '../utils/userService.js'
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

    // Fetch user details on component load
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getProfile();
                setUserDetails(data);
            } catch (error) {
                setMessage('Failed to load profile data');
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleChange = (e, section, index, field) => {
        const { value } = e.target;

        if (!index && !field) {
            setUserDetails({ ...userDetails, [section]: value });
            return;
        }

        if (userDetails[section]) {
            const updatedDetails = [...userDetails[section]];
            updatedDetails[index][field] = value;
            setUserDetails({ ...userDetails, [section]: updatedDetails });
        } else {
            console.error(`Section "${section}" does not exist in userDetails.`);
        }
    };

    const handleAddSection = (section) => {
        const newItem = Object.keys(userDetails[section][0]).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {});
        setUserDetails({ ...userDetails, [section]: [...userDetails[section], newItem] });
    };

    const handleRemoveSection = (section, index) => {
        const updatedDetails = [...userDetails[section]];
        updatedDetails.splice(index, 1);
        setUserDetails({ ...userDetails, [section]: updatedDetails });
    };

    const validateUserDetails = (details) => {
        if (!details.name || details.name.length < 3) {
            return 'Name must be at least 3 characters long.';
        }
        if (!details.email || !/\S+@\S+\.\S+/.test(details.email)) {
            return 'Enter a valid email address.';
        }
        return null; // No validation errors
    };

    const validateNestedFields = (details) => {
        for (const exp of details.experience) {
            if (exp.company && exp.company.length < 3) return 'Company name must be at least 3 characters long.';
        }
        for (const edu of details.education) {
            if (edu.institution && edu.institution.length < 3) return 'Institution name must be at least 3 characters long.';
        }
        return null; // No validation errors
    };

    const filterEmptySections = (details) => {
        const filteredDetails = { ...details };
        ['experience', 'education', 'classes', 'certifications', 'awards', 'recommendations'].forEach((section) => {
            if (details[section]) {
                filteredDetails[section] = details[section].filter((item) =>
                    Object.values(item).some((value) => value.trim() !== '')
                );
            }
        });
        return filteredDetails;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateUserDetails(userDetails) || validateNestedFields(userDetails);
        if (validationError) {
            setMessage(validationError);
            return;
        }

        const filteredDetails = filterEmptySections(userDetails);

        try {
            const updatedUser = await updateProfile(filteredDetails);
            setMessage('Profile updated successfully');
            setTimeout(() => navigate('/profile'), 1000);
        } catch (error) {
            setMessage(`Error updating profile: ${error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h1>Edit Profile</h1>
                    <p className="small text-light">Update your profile details below</p>
                </div>
                <div className="card-body">
                    {message && (
                        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        {/* Basic Fields */}
                        {[
                            { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your full name' },
                            { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email address' },
                            { label: 'Bio', name: 'bio', type: 'textarea', placeholder: 'Write a short bio' },
                        ].map(({ label, name, type, placeholder }, index) => (
                            <div className="mb-4" key={index}>
                                <label className="form-label">{label}:</label>
                                {type === 'textarea' ? (
                                    <textarea
                                        className="form-control"
                                        value={userDetails[name]}
                                        placeholder={placeholder}
                                        onChange={(e) => handleChange(e, name)}
                                    ></textarea>
                                ) : (
                                    <input
                                        type={type}
                                        className="form-control"
                                        value={userDetails[name]}
                                        placeholder={placeholder}
                                        onChange={(e) => handleChange(e, name)}
                                    />
                                )}
                            </div>
                        ))}

                        {/* Section Fields */}
                        {['experience', 'education', 'classes', 'certifications', 'awards', 'recommendations'].map((section, index) => (
                            <div key={index}>
                                <h5 className="mt-4">{section.charAt(0).toUpperCase() + section.slice(1)}</h5>
                                {userDetails[section].map((item, itemIndex) => (
                                    <div className="border p-3 mb-4" key={itemIndex}>
                                        {Object.keys(item).map((field, fieldIndex) => (
                                            <div className="mb-3" key={fieldIndex}>
                                                <label className="form-label">
                                                    {field.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={item[field]}
                                                    placeholder={`Enter ${field}`}
                                                    onChange={(e) => handleChange(e, section, itemIndex, field)}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm mt-2"
                                            onClick={() => handleRemoveSection(section, itemIndex)}
                                        >
                                            Remove Item
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm mt-3"
                                    onClick={() => handleAddSection(section)}
                                >
                                    Add New Item
                                </button>
                            </div>
                        ))}

                        <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
