import React, { useState, useEffect } from 'react';
import AuthContext from './authContext';

const AuthState = ({ children }) => {
    const [userType, setUserType] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            setUserType(localStorage.getItem('userType'));
            setIsLoggedIn(true);
        }
    }, []);

    const login = (type) => {
        localStorage.setItem('userType', type);
        setUserType(type);
        setIsLoggedIn(true); // Immediately set isLoggedIn to true
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('userType');
        setUserType(null);
        setIsLoggedIn(false); // Immediately set isLoggedIn to false
    };

    return (
        <AuthContext.Provider value={{ userType, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;
