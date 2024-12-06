import React, { useState, useEffect } from 'react';
import AuthContext from './authContext';

const AuthState = ({ children }) => {
    const [type, setUserType] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const storedType = localStorage.getItem('type');
    
        if (token && storedType) {
            setUserType(storedType); // Update userType state
            setIsLoggedIn(true); // Update logged-in status
        }
    }, []);
    
    const login = (type) => {
        localStorage.setItem('type', type);
        setUserType(type);
        setIsLoggedIn(true); // Immediately set isLoggedIn to true
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('type');
        setUserType(null);
        setIsLoggedIn(false); // Immediately set isLoggedIn to false
    };

    return (
        <AuthContext.Provider value={{ type, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;
