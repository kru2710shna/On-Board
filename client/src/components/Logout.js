// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
    const navigate = useNavigate();

    const confirmLogout = () => {
        handleLogout();
        navigate('/'); // Redirect after logout
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
