import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth/authContext';
import '../Login.css'; // Add this for custom CSS

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = `${String(process.env.REACT_APP_API_BASE_URL)}/api/${String(process.env.REACT_APP_AUTH_FOR_USER)}/${String(process.env.REACT_APP_LOGIN_FOR_USER)}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            const res = await response.json();

            if (res.Success && res.token) {
                localStorage.setItem('auth_token', res.token);
                login('user');
                alert('Logged In Successfully');
                navigate('/Dashboard');
            } else {
                throw new Error(res.error || "Login failed");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed: ' + error.message);
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="login-page d-flex justify-content-center align-items-center">
            <div className="container login-container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <div className="card shadow-lg login-card d-flex flex-row">
                            {/* Left Section */}
                            <div className="card-body left-section p-4 d-flex flex-column justify-content-center">
                                <h3 className="mb-3 text-primary">Welcome to On-Board!</h3>
                                <p className="text-muted">
                                    On-Board is a secure platform designed to help you network and grow your career.
                                    Login securely to access your dashboard and stay connected.
                                </p>
                                <ul className="text-muted">
                                    <li>Secure Login</li>
                                    <li>Personalized Networking</li>
                                    <li>Real-time Updates</li>
                                </ul>
                            </div>
                            {/* Right Section */}
                            <div className="card-body right-section p-4 bg-white">
                                <h2 className="card-title text-center mb-4">Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={credentials.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg w-100">Login</button>
                                </form>
                                <div className="mt-3 text-center">
                                    <p>Don't have an account? <Link to="/signup" className="link-primary">Sign Up Now</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="footer mt-3 text-center text-muted">
                            <p>Need help? <Link to="/help" className="link-primary">Contact Support</Link></p>
                            <p>&copy; 2024 On-Board. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
