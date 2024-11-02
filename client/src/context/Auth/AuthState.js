import React, { useState, useEffect } from 'react';
import AuthContext from './authContext';


const AuthState = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if userType is in local storage to set isLoggedIn
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (type) => {
    localStorage.setItem('userType', type);
    setUserType(type);
    setIsLoggedIn(true);
    console.log("Logged in:", isLoggedIn); // Log to check login status
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem('userType');
    setUserType(null);
    setIsLoggedIn(false);
    console.log("Logged out, isLoggedIn:", isLoggedIn); // Check if this updates
};

  return (
    <AuthContext.Provider value={{ userType, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
