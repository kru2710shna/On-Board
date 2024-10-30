// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        name: '', email: '', password: '', confirmPassword: '', userType: ''
    });

    const navigate = useNavigate(); // Initialize navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, userType } = credentials;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const apiUrl = `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'}/api/${process.env.REACT_APP_AUTH_FOR_USER || 'user'}/${process.env.REACT_APP_CREATEUSER_TAG || 'createuser'}`;
            console.log("Final API URL:", apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, type: userType }),
            });

            const res = await response.json();
            console.log("Response:", res);

            if (response.ok) {
                alert('Thank you for joining On-Board');
                navigate('/login');
            } else {
                console.error("Signup failed:", res.errors || res.error);
                alert(`Signup failed: ${res.errors ? res.errors.map(err => err.msg).join(", ") : res.error}`);
                throw new Error(res.error || "Signup failed");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Signup failed: ' + error.message);
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Sign Up</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name" // Add name attribute
                                        value={credentials.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email" // Add name attribute
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password" // Add name attribute
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword" // Add name attribute
                                        value={credentials.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userType">User Type:</label>
                                    <select
                                        id="userType"
                                        className="form-control"
                                        name="userType"
                                        value={credentials.userType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select user type</option>
                                        <option value="Student">Student</option>
                                        <option value="Recruiter">Recruiter</option>
                                        <option value="Company">Company</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                            </form>
                            <div className="mt-3 text-center">
                                <p>Already have an account? <a href="/login">Login</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
