// src/components/NavBarWrapper.js
import React from 'react';
import NavBar from './NavBar';
// import { useAuth } from './AuthContext';

const NavBarWrapper = () => {
    // const { isLoggedIn, handleLogout } = useAuth();

    return <NavBar /* isLoggedIn={isLoggedIn} handleLogout={handleLogout} */ />;
};

export default NavBarWrapper;
