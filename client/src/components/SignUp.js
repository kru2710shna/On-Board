import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SignUp.css';
import { createUser } from '../utils/userService'; // Import createUser from userService

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        name: '', email: '', password: '', confirmPassword: '', userType: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, userType } = credentials;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const userDetails = { name, email, password, type: userType };
            // eslint-disable-next-line
            const response = await createUser(userDetails);

            alert('Thank you for joining On-Board');
            navigate('/login');
        } catch (error) {
            alert(`Signup failed: ${error.message}`);
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                {/* Left Section */}
                <div className="left-section">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>Trustable</li>
                        <li>Easy to Use</li>
                        <li>Secure Platform</li>
                        <li>Designed for Everyone</li>
                        <li>24/7 Support</li>
                    </ul>
                </div>
                {/* Right Section */}
                <div className="right-section">
                    <h2 className="text-center">Sign-Up User!</h2>
                    <p className="text-center">Welcome! Please provide your details to create an account.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={credentials.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={credentials.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter your password"
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
                    <p className="text-center mt-3">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
