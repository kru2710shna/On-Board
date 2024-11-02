// src/components/Logout.js
import React , {useContext}from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth/authContext';

const Logout = (/* { handleLogout } */) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const confirmLogout = () => {
        logout(); // Call logout to update auth state
        navigate('/'); // Redirect after logout
        alert('Logged out successfully');
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h2 className="mb-4">Are you sure you want to log out?</h2>
                            <button 
                                onClick={confirmLogout} 
                                className="btn btn-danger w-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
