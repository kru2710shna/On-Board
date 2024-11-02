import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth/authContext';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const confirmLogout = () => {
        logout(); // Call logout to update auth state
        alert('Logged out successfully');
        navigate('/'); // Redirect to homepage after logout
    };

    const signInDifferentUser = () => {
        logout(); // Logout current user
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-light text-dark">
                            <h4 className="mb-0">Logout Confirmation</h4>
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text lead mb-4">
                                Are you sure you want to log out?
                            </p>
                            <button 
                                onClick={confirmLogout} 
                                className="btn btn-outline-primary btn-lg w-100 mb-3"
                            >
                                Confirm Logout
                            </button>
                            <button 
                                onClick={signInDifferentUser} 
                                className="btn btn-outline-secondary btn-lg w-100 mb-3"
                            >
                                Sign In as a Different User
                            </button>
                            <button 
                                onClick={() => navigate(-1)} // Navigate back to previous page
                                className="btn btn-outline-dark btn-lg w-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
