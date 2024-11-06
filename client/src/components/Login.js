import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth/authContext';
import '../login.css'; 

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
        <div className="login-page">
            <div className="container login-container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow login-card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Welcome Back!</h2>
                                <p className="text-center text-muted">Please enter your credentials to log in.</p>
                                <form onSubmit={handleSubmit} className="login-form">
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            id="email"
                                            name="email"
                                            value={credentials.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
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
                                <div className="mt-4 text-center">
                                    <p>Don't have an account? <Link to="/signup" className="link-primary">Sign Up Now</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="footer mt-5 text-center text-muted">
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
